import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookingList} from './my-booking/my-booking.component';
import {BookingHistoryComponent} from "./booking-history/booking-history.component";



const routes: Routes = [
  {
    path:'delete/:id',
    component:BookingList
  },
  {
   path:'booking-history',
    component: BookingHistoryComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingModuleRoutingModule { }
