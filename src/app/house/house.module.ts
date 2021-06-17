import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DetailHouseComponent} from './detail-house/detail-house.component';

import {HouseCreateComponent} from './house-create/house-create.component';
import {ListHouseComponent} from './list-house/list-house.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HouseRoutingModule} from './house-routing.module';
import {SharedModule} from '../shared/shared.module';
import {SharedRoutingModule} from '../shared/shared-routing.module';
import {BookingActiveModule} from '../booking-active/booking-active.module';
import {OpenListHouse} from './my-house/my-house.component';

@NgModule({
    declarations: [
        ListHouseComponent,
        DetailHouseComponent,
        HouseCreateComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HouseRoutingModule,
    SharedModule,
    BookingActiveModule,
  ],
    exports: [
        ListHouseComponent
    ],
  entryComponents:[
    OpenListHouse
  ]
})
export class HouseModule {
}
