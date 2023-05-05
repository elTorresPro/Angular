import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sesion } from '../model/sesion';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  sesionSubject: BehaviorSubject<Sesion>;

  constructor() {
    const sesion: Sesion = {
      sesionActiva: false,
    };
    this.sesionSubject = new BehaviorSubject(sesion);
  }

  login(usuario: string, contrasena: string, admin: boolean, id: number, nombre: string, img: string) {
    const sesion: Sesion = {
      sesionActiva: true,
      usuarioActivo: {
        id: id,
        usuario: usuario,
        contrasena: contrasena,
        admin: admin,
        nombre:nombre,
        img:img
      },
    };
    this.sesionSubject.next(sesion);
  }

  clearToken(){
    return sessionStorage.setItem("token",'')
  }

  obtenerDatosSesion(): Observable<Sesion> {
    return this.sesionSubject.asObservable();
  }
}
