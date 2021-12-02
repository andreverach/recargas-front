import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [//todos van a compartir este layout
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: 'admin',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./admin/inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path: 'recargas',
        loadChildren: () => import('./admin/recargas/recargas.module').then(m => m.RecargasModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('./admin/clientes/clientes.module').then(m => m.ClientesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, {
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
