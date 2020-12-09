import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  notifier = new Subject();

  constructor(
    readonly userService: UserService
  ) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
