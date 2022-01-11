import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
//import para forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//para consumir apis con httpClient se importa en este modulo el modulo de HttpClient
import { HttpClientModule } from '@angular/common/http';
//este modulo de animaciones se agrega automaticamente con angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//core
import { CoreModule } from '@core/core.module';
//shared
import { SharedModule } from '@shared/shared.module';
//modulo de material
import { MaterialModule } from '@material/material.module';
//Componentes necesarios para configurar el paginador a espanol
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlEspService } from '@shared/utils/mat-paginator-intl-esp.service';

//componentes
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { EntradaComponent } from './layout/entrada/entrada.component';//para la entrada principal
import { MainComponent } from './layout/main/main.component';//layout de las paginas publicas

//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    EntradaComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //ReactiveFormsModule,    
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlEspService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
