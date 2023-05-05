import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { AlumnoListaComponent } from './pages/alumno-lista/alumno-lista.component';
import { EditarAlumnoComponent } from './pages/editar-alumno/editar-alumno.component';
import { MiMaterialModule } from '../../shared/module/mi-material.module';
import { PipeModule } from '../../shared/pipes/pipe.module';


@NgModule({
  declarations: [
    FormularioComponent,
    AlumnoListaComponent,
    EditarAlumnoComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    MiMaterialModule,
    PipeModule
  ]
})
export class AlumnosModule { }
