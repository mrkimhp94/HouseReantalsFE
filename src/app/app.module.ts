import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListHouseComponent } from './house/list-house/list-house.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HouseModule} from "./house/house.module";
import {HouseService} from "./service/house.service";
import {ChildrenOutletContexts, RouterModule, Routes} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";

// const routes: Routes = [{
//   path: '',
//   pathMatch: 'full',
//   redirectTo: 'houses'
// }, {
//   path : 'houses',
//   loadChildren: () => import('./house/house.module').then(module => module.HouseModule)
// },
//
// ];

//   {
//   path: 'booking',
//   loadChildren: ()
//     nhanh' khac
// }

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HouseModule,
  ],
  providers: [HttpClient,HouseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
