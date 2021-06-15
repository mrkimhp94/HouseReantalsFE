import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseRoutingModule } from './house-routing.module';
import { HouseCreateComponent } from './house-create/house-create.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [HouseCreateComponent],
  imports: [
    CommonModule,
    HouseRoutingModule,
    FormsModule
  ]
})
export class HouseModule { }
