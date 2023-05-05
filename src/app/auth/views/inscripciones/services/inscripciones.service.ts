import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Inscripciones } from '../model/inscripciones';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private apiURL = environments.apiURL;
  constructor(
    private http: HttpClient
  ) { }

  obtenerInscripciones(): Observable<Inscripciones[]>{
    return this.http.get<Inscripciones[]>(`${this.apiURL}/inscripciones`).pipe(catchError(this.manejoError))
  }

  agregarInscripciones(inscripciones: Inscripciones):Observable<Inscripciones>{
    return this.http.post<Inscripciones>(`${this.apiURL}/inscripciones`,inscripciones).pipe(catchError(this.manejoError))
  }

  eliminarInscripciones(inscripciones:Inscripciones):Observable<Inscripciones>{
    return this.http.delete<Inscripciones>(`${this.apiURL}/inscripciones/${inscripciones.id}`).pipe(catchError(this.manejoError));
  }

  private manejoError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.warn('error del aldo del cliente', error.error.message);
    } else {
      console.warn('error del aldo del servidor', error.error.message);
    }

    return throwError(() => new Error('error en la conmunicacion HTTP'));
  }

}
