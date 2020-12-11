import {Inject, Injectable} from '@angular/core';
import {API_BASE_URL} from '../tokens';
import {HttpClient} from '@angular/common/http';
import {StoreService} from './store.service';
import {from, Observable} from 'rxjs';
import {UserDTO, UserModel} from '../models/userDTO';
import {map, mergeMap, tap, toArray} from 'rxjs/operators';
import {Repository} from '../models/repository';
import {Organization} from '../models/organization';
import {GithubNetworkResponse} from '../models/network';

@Injectable()
export class UserService {

  constructor(
    @Inject(API_BASE_URL) readonly baseUrl: string,
    readonly http: HttpClient,
    readonly store: StoreService
  ) {
  }

  getUsers(): Observable<Array<UserModel>> {
    return this.http.get<Array<UserDTO>>(`${this.baseUrl}/users`)
      .pipe(
        this.fillUsersWithRepos,
        tap(users => this.store.setUsers(users)),
      );
  }

  getUser(payload: string): Observable<UserModel> {
    return this.http.get<UserDTO>(`${this.baseUrl}/users/${payload}`)
      .pipe(
        this.fillUserWithRepos,
        tap(user => this.store.setUser(user)),
      );
  }

  searchUsers(userName: string): Observable<Array<UserModel>> {
    return this.http.get<GithubNetworkResponse<UserDTO>>(`${this.baseUrl}/search/users`, {
      params: {
        q: userName
      }
    }).pipe(
      map(user => user.items),
      this.fillUsersWithRepos,
      tap(users => this.store.setUsers(users))
    );
  }

  getUserFollowers(user: string): Observable<Array<UserModel>> {
    return this.http.get<Array<UserDTO>>(`${this.baseUrl}/users/${user}/followers`)
      .pipe(
        this.fillUsersWithRepos,
        tap(followers => this.store.setFollowers(followers))
      );
  }

  getUserRepos(username: string): Observable<Array<Repository>> {
    return this.http.get<Array<Repository>>(`${this.baseUrl}/users/${username}/repos`)
      .pipe(
        tap(repos => this.store.setRepositories(repos))
      );
  }

  getUserOrganizations(username: string): Observable<Array<Organization>> {
    return this.http.get<Array<Organization>>(`${this.baseUrl}/users/${username}/orgs`)
      .pipe(
        tap(orgs => this.store.setOrganizations(orgs))
      );
  }


  // Custom Operator
  fillUsersWithRepos = (source: Observable<Array<UserDTO>>): Observable<Array<UserModel>> => {
    return source.pipe(
      mergeMap(users => from(users)),
      this.fillUserWithRepos,
      toArray(),
    );
  }

  // Custom Operator
  fillUserWithRepos = (source: Observable<UserDTO>): Observable<UserModel> => {
    return source.pipe(
      mergeMap((user) => this.getUserRepos(user.login)
        .pipe(
          map(repos => ({
            ...user,
            repos,
          }))
        )
      ),
    );
  }

}
