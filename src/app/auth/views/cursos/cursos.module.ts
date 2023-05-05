import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { ListaCursosComponent } from './pages/lista-cursos/lista-cursos.component';
import { EditarCursoComponent } from './pages/editar-curso/editar-curso.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './store/cursos.effects';
import { cursosFeatureKey, reducer } from './store/cursos.reducer';
import { MiMaterialModule } from '../../shared/module/mi-material.module';
import { PipeModule } from '../../shared/pipes/pipe.module';
import { DetalleCursoComponent } from './pages/detalle-curso/detalle-curso.component';


@NgModule({
  declarations: [
    FormularioComponent,
    ListaCursosComponent,
    EditarCursoComponent,
    DetalleCursoComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    MiMaterialModule,
    PipeModule,
    StoreModule.forFeature(cursosFeatureKey, reducer ),
    EffectsModule.forFeature([CursosEffects])
  ]
})
export class CursosModule { }
