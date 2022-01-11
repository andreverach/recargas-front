import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { MainComponent } from './layout/main/main.component';
import { EntradaComponent } from './layout/entrada/entrada.component';
import { LoginComponent } from './admin/login/components/login/login.component';
import { AdminGuard } from './admin.guard';
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
      },
      
    ]
  },
  {
    path: 'admin',
    component: EntradaComponent,
    children:[
    {
      path: 'login',
      loadChildren: () => import('./admin/login/login.module').then(m => m.LoginModule)
    }
  ]
  },
  {
    path: 'admin',
    component: MainComponent,
    children: [
      {
        path: 'inicio',
        //canActivate: [AdminGuard],
        loadChildren: () => import('./admin/inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path: 'recargas',
        //canActivate: [AdminGuard],
        loadChildren: () => import('./admin/recargas/recargas.module').then(m => m.RecargasModule)
      },
      {
        path: 'clientes',
        //canActivate: [AdminGuard],
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
