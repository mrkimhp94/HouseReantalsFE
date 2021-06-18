import {NgModule} from '@angular/core';

import {HouseCreateComponent} from './house-create/house-create.component';
import {ListHouseComponent} from './list-house/list-house.component';
import {DetailHouseComponent} from './detail-house/detail-house.component';
import {RouterModule, Routes} from '@angular/router';
import {OpenListHouse} from './my-house/my-house.component';


const routes: Routes = [
  {
    path: '',
    component: ListHouseComponent
  }, {
    path: 'my-houses',
    component: OpenListHouse
  },
  {
    path: 'detail/:houseId',
    component: DetailHouseComponent,
    loadChildren: () => import('../booking-active/booking-active.module').then(module => module.BookingActiveModule)
  },
  {
    path: 'create',
    component: HouseCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule {
}
