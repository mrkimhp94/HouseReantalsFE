import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookingModuleRoutingModule} from './booking-module-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {BookingList, MyBookingComponent} from './my-booking/my-booking.component';
import {MatButtonModule, MatTableModule} from '@angular/material';
// import {OpenListHouse} from '../house/my-house/my-house.component';

@NgModule({
  declarations: [MyBookingComponent, BookingList],
    imports: [
        CommonModule,
        BookingModuleRoutingModule,
        MatDialogModule,
        MatTableModule,
        MatButtonModule,
    ],
  exports: [
    MyBookingComponent
  ],
  entryComponents: [BookingList]
})
export class BookingModuleModule {
}
