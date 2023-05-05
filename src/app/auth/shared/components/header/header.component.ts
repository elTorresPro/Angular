import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Sesion } from 'src/app/auth/views/sessions/model/sesion';
import { Usuario } from 'src/app/auth/views/sessions/model/usuario';
import { SesionService } from 'src/app/auth/views/sessions/services/sesion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{


  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  usuario: Usuario;
  sesion$:Observable<Sesion>;
  subscription: Subscription;
  sesion: Sesion;

  constructor(
    private router: Router,
    private sesionService: SesionService
  ) { }

  ngOnInit(): void {
    this.sesion$ = this.sesionService.obtenerDatosSesion();
    this.subscription = this.sesion$.subscribe(
      (sesion: Sesion) => (this.sesion = sesion));
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logOut() {
    this.sesion.sesionActiva = false;
    this.sesion.usuarioActivo = {
      admin: false,
      id: -1,
      contrasena: '',
      usuario: '',
      nombre:'',
      img:'',
    };
    this.router.navigate(['/sessions/login']);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
