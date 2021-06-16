import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DetailHouseComponent} from './detail-house/detail-house.component';

import {HouseCreateComponent} from './house-create/house-create.component';
import {ListHouseComponent} from './list-house/list-house.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HouseRoutingModule} from './house-routing.module';
import {MyHouseComponent, OpenListHouse} from './my-house/my-house.component';
import {MatButtonModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    ListHouseComponent,
    DetailHouseComponent,
    HouseCreateComponent,
    MyHouseComponent,
    OpenListHouse
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HouseRoutingModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    ListHouseComponent,
    MyHouseComponent
  ],
  entryComponents:[OpenListHouse]
})
export class HouseModule {
}
