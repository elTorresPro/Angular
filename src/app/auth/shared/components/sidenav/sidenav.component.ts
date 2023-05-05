import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Sesion } from 'src/app/auth/views/sessions/model/sesion';
import { Usuario } from 'src/app/auth/views/sessions/model/usuario';
import { SesionService } from 'src/app/auth/views/sessions/services/sesion.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy{
  usuario!: Usuario;
  sesion$:Observable<Sesion>;
  subscription: Subscription;
  sesion: Sesion;

  constructor(
    private sesionService: SesionService,
  ){}

  ngOnInit(): void {
    this.sesion$ = this.sesionService.obtenerDatosSesion();
    this.subscription = this.sesion$.subscribe(
      (sesion: Sesion) => (this.sesion = sesion));
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
