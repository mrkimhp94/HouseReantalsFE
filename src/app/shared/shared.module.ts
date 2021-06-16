import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavComponent } from './nav/nav.component';
import { HeadComponent } from './head/head.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [ NavComponent, HeadComponent, FooterComponent, HeaderComponent],
  exports: [
    NavComponent,
    HeadComponent,
    FooterComponent,
    HeaderComponent
  ],
    imports: [
        CommonModule,
        SharedRoutingModule
    ]
})
export class SharedModule { }
