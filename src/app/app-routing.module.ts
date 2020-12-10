import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SingleUserComponent} from './components/single-user/single-user.component';
import {LandingComponent} from './components/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'users/:username',
    component: SingleUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
