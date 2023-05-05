import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminlayoutComponent } from './auth/shared/components/layouts/adminlayout/adminlayout.component';
import { AuthlayoutComponent } from './auth/shared/components/layouts/authlayout/authlayout.component';
import { AuthGuard } from './auth/shared/guard/auth.guard';
import { PublicLayoutComponent } from './public/shared/components/layout/public-layout/public-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'App/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'App',
        loadChildren: () => import('./public/views/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: '',
    component: AuthlayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./auth/views/sessions/sessions.module').then(m => m.SessionsModule)
      }
    ]
  },
  {
    path: '',
    component: AdminlayoutComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'alumnos',
        loadChildren: () => import('./auth/views/alumnos/alumnos.module').then(m => m.AlumnosModule)
      },
      {
        path: 'cursos',
        loadChildren: () => import('./auth/views/cursos/cursos.module').then(m => m.CursosModule)
      },
      {
        path:'inscripciones',
        loadChildren: () => import('./auth/views/inscripciones/inscripciones.module').then(m => m.InscripcionesModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
