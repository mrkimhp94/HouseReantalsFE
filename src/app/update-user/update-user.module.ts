import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateUserRoutingModule } from './update-user-routing.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UpdateProfileComponent} from './update-profile/update-profile.component';


@NgModule({
  declarations: [UpdateProfileComponent],
  imports: [
    CommonModule,
    UpdateUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    UpdateProfileComponent
  ],
})
export class UpdateUserModule { }
