import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MiMaterialModule } from '../../shared/module/mi-material.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    SessionsRoutingModule,
    MiMaterialModule
  ]
})
export class SessionsModule { }
