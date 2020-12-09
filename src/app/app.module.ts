import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {API_BASE_URL} from './tokens';
import {environment} from '../environments/environment';
import {UserService} from './services/user.service';
import {StoreService} from './services/store.service';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LandingComponent } from './components/landing/landing.component';
import { CardViewComponent } from './components/card-view/card-view.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    CardViewComponent,
    LoaderComponent
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
    UserService,
    StoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
