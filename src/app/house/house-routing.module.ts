import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HouseCreateComponent} from './house-create/house-create.component';


const routes: Routes = [
  {
    path: 'create',
    component : HouseCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
