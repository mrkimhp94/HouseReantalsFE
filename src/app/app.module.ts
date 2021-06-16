import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HouseModule} from './house/house.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {HouseService} from './service/house/house.service';
import {BookingActiveModule} from './booking-active/booking-active.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BookingServiceService} from './service/booking/bookingservice.service';
import {NotifyServiceService} from './service/notify/notify-service.service';
import {BookingModuleModule} from './booking-module/booking-module.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MyHouseComponent } from './house/my-house/my-house.component';
import { GeneralPopupComponent } from './general-popup/general-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GeneralPopupComponent,
  ],
  imports: [
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
    BookingActiveModule,
    BrowserAnimationsModule,
    BookingModuleModule,
    HouseModule

  ],
  providers: [HttpClient,
    HouseService , BookingServiceService, NotifyServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
