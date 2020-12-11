/* tslint:disable:variable-name */
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs';
import {retrieveSessionData, setSession} from '../../utils';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  formGroup = this.createFormGroup();
  subscription = new Subscription();
  pastSearchItems: Array<string> = [];
  showLatestSearches = true;
  _showSearch = false;

  createFormGroup(): FormGroup {
    return new FormGroup({
      search: new FormControl('')
    });
  }

  constructor(
    readonly userService: UserService
  ) {
  }

  @Input()
  set showSearch(_) {
    this._showSearch = true;
  }

  ngOnInit(): void {
    // const retrievedData = retrieveSessionData('latestSearches');
    this.pastSearchItems = !retrieveSessionData('latestSearches')
      ? [] :
      retrieveSessionData('latestSearches').slice(0, 3);
    this.formGroup.controls.search.valueChanges.pipe(
      filter(val => val === ''),
      tap(this.userService.getUsers().subscribe)
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  hideSearches(): void {
    this.showLatestSearches = false;
  }

  handleSubmit(userName?: string): void {
    const value = this.formGroup.controls.search.value;
    if (!value) {
      return;
    }

    this.pastSearchItems.unshift(value);
    this.pastSearchItems = this.pastSearchItems.length !== 0 ? this.pastSearchItems.slice(0, 3) : [];
    setSession('latestSearches', JSON.stringify(this.pastSearchItems));
    const sub = this.userService.searchUsers(value).subscribe();
    this.subscription.add(sub);
  }

  setSearchItem(item: string): void {
    this.formGroup.patchValue({
      search: item
    });
    this.userService.searchUsers(item);
    this.handleSubmit();
  }
}
