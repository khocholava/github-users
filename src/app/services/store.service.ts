import {Injectable} from '@angular/core';
import {UserModel} from '../models/userDTO';
import {BehaviorSubject, Observable} from 'rxjs';
import {Repository} from '../models/repository';
import {Organization} from '../models/organization';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private users$ = new BehaviorSubject<Array<UserModel>>([]);
  private user$ = new BehaviorSubject<UserModel | null>(null);
  private userFollowers$ = new BehaviorSubject<Array<UserModel>>([]);
  private userOrganizations$ = new BehaviorSubject<Array<Organization>>([]);
  private userRepositories$ = new BehaviorSubject<Array<Repository>>([]);

  constructor() {
  }

  getUsers(): Observable<Array<UserModel>> {
    return this.users$.asObservable();
  }

  getFollowers(): Observable<Array<UserModel>> {
    return this.userFollowers$.asObservable();
  }

  setUsers(users: Array<UserModel>): void {
    // this.githubUsers = users;
    this.users$.next(users);
  }
  setFollowers(followers: Array<UserModel>): void {
    this.userFollowers$.next(followers);
  }

  setUser(user: UserModel): void {
    this.user$.next(user);
  }

  getUser(): Observable<UserModel> {
    return this.user$.asObservable();
  }

  setRepositories(repo: Array<Repository>): void {
    this.userRepositories$.next(repo);
  }

  getRepositories(): Observable<Array<Repository>> {
    return this.userRepositories$.asObservable();
  }

  setOrganizations(organizations: Array<Organization>): void {
    this.userOrganizations$.next(organizations);
  }

  getOrganizations(): Observable<Array<Organization>> {
    return this.userOrganizations$.asObservable();
  }
}
