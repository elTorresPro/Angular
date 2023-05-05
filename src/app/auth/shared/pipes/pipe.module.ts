import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroCursosPipe } from './filtro-cursos.pipe';
import { AlumnoPipe } from './alumno.pipe';



@NgModule({
  declarations: [
    FiltroCursosPipe,
    AlumnoPipe
  ],
  exports:[
    FiltroCursosPipe,
    AlumnoPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
