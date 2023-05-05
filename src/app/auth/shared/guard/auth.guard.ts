import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Sesion } from '../../views/sessions/model/sesion';
import { SesionService } from '../../views/sessions/services/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private sesionService: SesionService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sesionService.obtenerDatosSesion().pipe(
      map((sesion: Sesion) => {
        if (sesion.usuarioActivo) {
          return true;
        } else {
          this.router.navigate(['/sessions/registro'])
          return false
        }
      })
    )
  }

}
