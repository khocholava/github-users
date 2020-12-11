import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {API_BASE_URL} from './tokens';
import {environment} from '../environments/environment';
import {UserService} from './services/user.service';
import {StoreService} from './services/store.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LandingComponent} from './components/landing/landing.component';
import {CardViewComponent} from './components/card-view/card-view.component';
import {LoaderComponent} from './components/loader/loader.component';
import {ListViewComponent} from './components/list-view/list-view.component';
import {SafeUrlPipe} from './safe-url.pipe';
import {SingleUserComponent} from './components/single-user/single-user.component';
import {ApiInterceptor} from './interceptors/api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    CardViewComponent,
    LoaderComponent,
    ListViewComponent,
    SafeUrlPipe,
    SingleUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: API_BASE_URL, useValue: environment.apiBaseUrl
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: ApiInterceptor,
    },
    UserService,
    StoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
