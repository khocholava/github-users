import {Inject, Injectable} from '@angular/core';
import {API_BASE_URL} from '../tokens';
import {HttpClient} from '@angular/common/http';
import {StoreService} from './store.service';
import {from, Observable} from 'rxjs';
import {User} from '../models/user';
import {map, mergeMap, tap, toArray} from 'rxjs/operators';
import {Repository} from '../models/repository';
import {Organization} from '../models/organization';

@Injectable()
export class UserService {

  constructor(
    @Inject(API_BASE_URL) readonly baseUrl: string,
    readonly http: HttpClient,
    readonly store: StoreService
  ) {
  }

  // @TODO  refactor get user repos
  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.baseUrl}/users`)
      .pipe(
        mergeMap(users => from(users)),
        mergeMap(user => this.getUserRepos(user.login)
          .pipe(
            map(repos => ({
              ...user,
              repos,
            }))
          )
        ),
        toArray(),
        tap(users => this.store.users = users),
      );
  }

  getSingleUser(payload: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${payload}`);
  }

  searchUser(userName: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search/users`, {
      params: {
        q: userName
      }
    }).pipe(
      map(
        user => user.items,
      ),
      mergeMap(users => from(users)),
      mergeMap((user: any) => this.getUserRepos(user.login)
        .pipe(
          map(repos => ({
            ...user,
            repos,
          }))
        )
      ),
      toArray(),
      tap(users => this.store.users = users)
    );
  }

  getUserFollowers(user: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.baseUrl}/users/${user}/followers`)
      .pipe(
        mergeMap(users => from(users)),
        mergeMap((user: User) => this.getUserRepos(user.login)
          .pipe(
            map(repos => ({
              ...user,
              repos,
            }))
          )
        ),
        toArray(),
        tap(followers => this.store.followers = followers)
      );
  }

  getUserRepos(username: string): Observable<Array<Repository>> {
    return this.http.get<Array<Repository>>(`${this.baseUrl}/users/${username}/repos`)
      .pipe(
        tap(repos => this.store.repositories = repos)
      );
  }

  getUserOrganizations(username: string): Observable<Array<Organization>> {
    return this.http.get<Array<Organization>>(`${this.baseUrl}/users/${username}/orgs`)
      .pipe(
        tap(orgs => this.store.organizations = orgs)
      );
  }
}
