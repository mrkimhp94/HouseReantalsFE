import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavComponent } from './nav/nav.component';
import { HeadComponent } from './head/head.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {MyHouseComponent} from '../house/my-house/my-house.component';
import {BookingModuleModule} from '../booking-module/booking-module.module';
import {MatButtonModule} from '@angular/material';
import {HouseModule} from '../house/house.module';


@NgModule({
  declarations: [NavComponent, HeadComponent, FooterComponent, HeaderComponent, MyHouseComponent],
  exports: [
    NavComponent,
    HeadComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatButtonModule,
    BookingModuleModule,
  ]
})
export class SharedModule { }
