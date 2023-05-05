import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleCursoComponent } from './pages/detalle-curso/detalle-curso.component';
import { EditarCursoComponent } from './pages/editar-curso/editar-curso.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { ListaCursosComponent } from './pages/lista-cursos/lista-cursos.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component:ListaCursosComponent
      },
      {
        path:'form',
        component:FormularioComponent
      },
      {
        path:'edit',
        component:EditarCursoComponent
      },
      {
        path:':id',
        component:DetalleCursoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
