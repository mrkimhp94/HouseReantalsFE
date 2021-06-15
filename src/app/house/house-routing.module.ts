import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListHouseComponent} from "./list-house/list-house.component";
import {DetailHouseComponent} from "./detail-house/detail-house.component";


const routes: Routes = [
  {
    path: '',
    component: ListHouseComponent
  },
  {
    path: 'detail/:houseId',
    component: DetailHouseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
