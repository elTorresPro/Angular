import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { InscripcionesListaComponent } from './pages/inscripciones-lista/inscripciones-lista.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component:InscripcionesListaComponent
      },
      {
        path:'form',
        component:FormularioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripcionesRoutingModule { }
