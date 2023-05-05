import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoListaComponent } from './pages/alumno-lista/alumno-lista.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { EditarAlumnoComponent } from './pages/editar-alumno/editar-alumno.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component:AlumnoListaComponent
      },
      {
        path:'form',
        component:FormularioComponent
      },
      {
        path:'edit',
        component:EditarAlumnoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
