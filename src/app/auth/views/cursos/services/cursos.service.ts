import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, Observable, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Curso } from '../model/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiURL = environments.apiURL;
  constructor(
    private http: HttpClient
  ) { }

  obtenerCursos(): Observable<Curso[]> {
    return this.http
      .get<Curso[]>(`${this.apiURL}/cursos`, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'Utf-8',
        }),
      })
      .pipe(catchError(this.manejoError));
  }

  obtenerCurso(id: number): Observable<Curso> {
    return this.http
      .get<Curso>(`${this.apiURL}/cursos/${id}`, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'Utf-8',
        }),
      })
      .pipe(catchError(this.manejoError));
  }

  agregarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.apiURL}/cursos`, curso).pipe(catchError(this.manejoError))
  }

  editarCurso(curso: Curso) {
    this.http
      .put<Curso>(`${this.apiURL}/cursos/${curso.id}`, curso)
      .pipe(catchError(this.manejoError))
      .subscribe();
  }

  eliminarCurso(id: number) {
    return this.http
      .delete<Curso>(`${this.apiURL}/cursos/${id}`)
      .pipe(concatMap(() => this.obtenerCursos()));
  }


  private manejoError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.warn('error de el lado del cliente', error.error.message);
    } else {
      console.warn('error de el lado del servidor', error.error.message);
    }

    return throwError(() => new Error('error en la conmunicacion HTTP'));
  }
}
