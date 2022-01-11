import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';

//material
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class LoginModule { }
