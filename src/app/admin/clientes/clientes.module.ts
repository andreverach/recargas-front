import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//formularios - para usar en este modulo
//forms para ngmodel y rective para forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './components/clientes/clientes.component';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { ClienteDetailComponent } from './components/cliente-detail/cliente-detail.component';
import { ClientesAddComponent } from './components/clientes-add/clientes-add.component';


@NgModule({
  declarations: [
    ClientesComponent,
    ClienteDetailComponent,
    ClientesAddComponent  
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule    
  ]
})
export class ClientesModule { }
