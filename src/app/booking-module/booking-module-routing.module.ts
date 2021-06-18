import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookingList} from './my-booking/my-booking.component';


const routes: Routes = [
  {
    path:'delete/:id',
    component:BookingList
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingModuleRoutingModule { }
