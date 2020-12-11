import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs';
import {StoreService} from '../../services/store.service';
import {retrieveSessionData, setSession} from '../../utils';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  users$ = this.store.getUsers();
  isLoading = true;
  isCardMode = true;
  isListMode = false;
  suvs;

  constructor(
    readonly userService: UserService,
    readonly store: StoreService,
  ) {
  }

  ngOnInit(): void {

    const gridView = retrieveSessionData('gridView');
    this.isCardMode = gridView.isCardMode;
    this.isListMode = gridView.isListMode;
    const subs = this.userService.getUsers()
      .subscribe(() => this.isLoading = false);
    this.subscription.add(subs);
  }

  handleCardMode(): void {
    this.isCardMode = true;
    this.isListMode = false;
    setSession('gridView', JSON.stringify({isCardMode: this.isCardMode, isListMode: this.isListMode}));
  }

  handleListMode(): void {
    this.isCardMode = false;
    this.isListMode = true;
    setSession('gridView', JSON.stringify({isCardMode: this.isCardMode, isListMode: this.isListMode}));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
