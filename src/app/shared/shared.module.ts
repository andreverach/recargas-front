import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
//para que funcionen las rutas con routerlink
import { RouterModule } from '@angular/router';

//pipes personalizados
import { DiamondsPipe } from './pipes/diamonds.pipe';

//componentes que se comparten
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { DialogCipComponent } from './components/dialog-cip/dialog-cip.component';
import { DialogQuantityComponent } from './components/dialog-quantity/dialog-quantity.component';

//material
import { MaterialModule } from '@material/material.module';

@NgModule({
  declarations: [
    DiamondsPipe,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    DialogCipComponent,
    DialogQuantityComponent    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DiamondsPipe,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    DialogCipComponent,
    DialogQuantityComponent
  ]
})
export class SharedModule { }
