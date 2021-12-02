import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';

import { RecargasRoutingModule } from './recargas-routing.module';
import { RecargasComponent } from './components/recargas/recargas.component';


@NgModule({
  declarations: [
    RecargasComponent
  ],
  imports: [
    CommonModule,
    RecargasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule 
  ]
})
export class RecargasModule { }
