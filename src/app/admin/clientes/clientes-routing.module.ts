import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDetailComponent } from './components/cliente-detail/cliente-detail.component';
import { ClientesAddComponent } from './components/clientes-add/clientes-add.component';
import { ClientesComponent } from './components/clientes/clientes.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent
  },
  {
    path: 'detail',
    component: ClienteDetailComponent
  },
  {
    path: 'add',
    component: ClientesAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
