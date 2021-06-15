import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyBookingComponent } from './booking-module/my-booking/my-booking.component';
import {BookingModuleModule} from './booking-module/booking-module.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BookingServiceService} from './bookingservice.service';
import {BookingActiveModule} from './booking-active/booking-active.module';
import {BookingActiveComponent} from './booking-active/bookingActive/bookingactive.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BookingModuleModule,
    HttpClientModule,
    BookingActiveModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [HttpClient, BookingServiceService],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
