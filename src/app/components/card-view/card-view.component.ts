import {Component, Input, OnInit} from '@angular/core';
import {UserDTO, UserModel} from '../../models/userDTO';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {
  @Input() users$: Observable<Array<UserModel>> | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
