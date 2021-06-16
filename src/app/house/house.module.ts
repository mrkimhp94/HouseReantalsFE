import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DetailHouseComponent} from './detail-house/detail-house.component';

import {HouseCreateComponent} from './house-create/house-create.component';
import {ListHouseComponent} from './list-house/list-house.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HouseRoutingModule} from './house-routing.module';

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
        HouseRoutingModule
    ],
    exports: [
        ListHouseComponent
    ],
    // exports: [
    //   HouseRoutingModule
    // ]
})
export class HouseModule {
}
