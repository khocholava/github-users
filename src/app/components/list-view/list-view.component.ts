import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserModel} from '../../models/userDTO';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  @Input() users$: Observable<Array<UserModel>> | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
