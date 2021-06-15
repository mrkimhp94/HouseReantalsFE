import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListHouseComponent} from "./list-house/list-house.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DetailHouseComponent} from './detail-house/detail-house.component';
import {HouseRoutingModule} from "./house-routing.module";

@NgModule({
  declarations: [
    ListHouseComponent,
    DetailHouseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HouseRoutingModule
  ],
  // exports: [
  //   HouseRoutingModule
  // ]
})
export class HouseModule {
}
