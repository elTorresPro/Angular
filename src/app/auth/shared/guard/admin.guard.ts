import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Sesion } from '../../views/sessions/model/sesion';
import { SesionService } from '../../views/sessions/services/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private sesionService: SesionService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sesionService.obtenerDatosSesion().pipe(
      map((sesion: Sesion) => {
        if (sesion.usuarioActivo?.admin) {
          return true;
        }
        else {
          return false;
        }
      })
    )
  }

}
