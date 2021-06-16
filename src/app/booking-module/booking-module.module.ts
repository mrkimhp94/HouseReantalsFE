import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookingModuleRoutingModule} from './booking-module-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {BookingList, MyBookingComponent} from './my-booking/my-booking.component';
import {MatTableModule} from '@angular/material';

@NgModule({
  declarations: [MyBookingComponent,BookingList],
    imports: [
        CommonModule,
        BookingModuleRoutingModule,
        MatDialogModule,
        MatTableModule,

    ],
  exports: [
    MyBookingComponent
  ],
  entryComponents:[BookingList]
})
export class BookingModuleModule {
}
