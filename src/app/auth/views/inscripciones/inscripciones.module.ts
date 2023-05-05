import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { InscripcionesListaComponent } from './pages/inscripciones-lista/inscripciones-lista.component';
import { MiMaterialModule } from '../../shared/module/mi-material.module';
import { PipeModule } from '../../shared/pipes/pipe.module';


@NgModule({
  declarations: [
    FormularioComponent,
    InscripcionesListaComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    MiMaterialModule,
    PipeModule
  ]
})
export class InscripcionesModule { }
