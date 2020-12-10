import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/user';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  @Input() users$: Observable<Array<User>> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
