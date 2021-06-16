import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './service/authentication.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {JwtInterceptor} from './helper/jwt-interceptor';
import {LoginModule} from './login/login.module';
import {RegisterModule} from './register/register.module';
import {RegisterComponent} from './register/register.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {HouseModule} from './house/house.module';
import {BookingActiveModule} from './booking-active/booking-active.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HouseService} from './service/house/house.service';
import {CommonModule} from '@angular/common';
import {GeneralPopupComponent} from './general-popup/general-popup.component';
import {MatDialogModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    GeneralPopupComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HouseModule,
    BookingActiveModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RegisterModule,
    LoginModule,
    MatDialogModule
  ],
  providers: [
    HttpClient,
    HouseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
