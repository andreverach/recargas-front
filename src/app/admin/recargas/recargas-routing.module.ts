import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecargasComponent } from './components/recargas/recargas.component';

const routes: Routes = [
  {
    path: '',
    component: RecargasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecargasRoutingModule { }
