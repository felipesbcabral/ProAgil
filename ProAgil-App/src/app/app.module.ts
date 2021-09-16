import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { EventoService } from './_services/evento.service';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventosComponent } from './eventos/eventos.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatosComponent } from './contatos/contatos.component';
import { TituloComponent } from './_shared/titulo/titulo.component'

import { DateTimeFormat } from './_helps/DateTimeFormat.pipe';


@NgModule({
  declarations: [				
    AppComponent,
      EventosComponent,
      NavComponent,
      DateTimeFormat,
      PalestrantesComponent,
      DashboardComponent,
      TituloComponent,
      ContatosComponent,
   ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    EventoService 
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
