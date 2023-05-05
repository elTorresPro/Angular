import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environmentsPROD } from 'src/environments/environments.prod';
import { Alumnos } from '../model/alumnos';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiURL = environmentsPROD.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  obtenerAlumnos(): Observable<Alumnos[]>{
    return this.http.get<Alumnos[]>(`${this.apiURL}/alumnos`).pipe(catchError(this.manejoError));
  }

  agregarAlumno(alumno:Alumnos):Observable<Alumnos>{
    return this.http.post<Alumnos>(`${this.apiURL}/alumnos`, alumno).pipe(catchError(this.manejoError));
  }
  eliminarAlumno(alumno:Alumnos):Observable<Alumnos>{
    return this.http.delete<Alumnos>(`${this.apiURL}/alumnos/${alumno.id}`).pipe(catchError(this.manejoError));
  }
  editarAlumno(alumno : Alumnos):Observable<Alumnos>{
    return this.http.put<Alumnos>(`${this.apiURL}/alumnos/${alumno.id}`, alumno).pipe(catchError(this.manejoError));
  }
  /*TESTING */
  testingAlumnos(){
    return this.http.get<Alumnos[]>(`${this.apiURL}/alumnos`)
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
