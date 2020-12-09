import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {Repository} from '../models/repository';
import {Organization} from '../models/organization';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private githubUsers: Array<User> = [];
  private users$ = new BehaviorSubject<Array<User>>([]);
  private userFollowers: Array<User> = [];
  private singleUser: User = {};
  private userRepos: Array<Repository> = [];
  private userOrganizations: Array<Organization> = [];

  constructor() {
  }

  getUsers(): Observable<Array<User>> {
    return this.users$.asObservable();
  }

  set users(users: Array<User>) {
    this.githubUsers = users;
    this.users$.next(this.githubUsers);
    console.log({
      githubUsers: this.githubUsers,
      users$: this.users
    });
  }

  get users(): Array<User> {
    return this.githubUsers;
  }

  set followers(followers: Array<User>) {
    this.userFollowers = followers;
  }

  get followers(): Array<User> {
    return this.userFollowers;
  }

  set user(user: User) {
    this.singleUser = user;
  }

  get user(): User {
    return this.singleUser;
  }

  set repositories(repo: Array<Repository>) {
    this.userRepos = repo;
  }

  get repositories(): Array<Repository> {
    return this.userRepos;
  }

  set organizations(organizations: Array<Organization>) {
    this.userOrganizations = organizations;
  }

  get organizations(): Array<Organization> {
    return this.userOrganizations;
  }
}
