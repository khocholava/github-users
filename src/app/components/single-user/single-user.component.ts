import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {StoreService} from '../../services/store.service';
import {forkJoin, Subscription} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit, OnDestroy {
  followers$ = this.store.getFollowers();
  username: string;
  subscription = new Subscription();
  isLoaded = false;
  user$ = this.store.getUser();
  organizations$ = this.store.getOrganizations();

  constructor(
    readonly route: ActivatedRoute,
    readonly userService: UserService,
    readonly store: StoreService
  ) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const routeSubs = this.route.paramMap.pipe(
      map((params) => params.get('username')),
      mergeMap((param) => {
        this.username = param;
        this.isLoaded = false;
        return forkJoin([
          this.userService.getUserFollowers(param),
          this.userService.getUser(param),
          this.userService.getUserOrganizations(param),
        ]);
      }),
    ).subscribe(() => this.isLoaded = true);
    this.subscription.add(routeSubs);
  }
}
