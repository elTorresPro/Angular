import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import {Alumnos} from '../../../alumnos/model/alumnos';
import { Sesion } from '../../../sessions/model/sesion';
import { SesionService } from '../../../sessions/services/sesion.service';
import { Inscripciones } from '../../model/inscripciones';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-inscripciones-lista',
  templateUrl: './inscripciones-lista.component.html',
  styleUrls: ['./inscripciones-lista.component.css']
})
export class InscripcionesListaComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'id',
    'codigo',
    'alumno',
    'fecha',
    'curso',
    'eliminar'
  ];

  dataSource: MatTableDataSource<Inscripciones>

  inscripciones: Inscripciones[];
  InscripcionesSubs: Subscription;
  inscripcion$: Observable<Inscripciones[]>

  sesion$:Observable<Sesion>;
  subscription: Subscription;
  sesion: Sesion;

  constructor(
    private inscripcioneServices: InscripcionesService,
    private sesionService: SesionService,
  ) { }

  ngOnInit(): void {
    this.inscripcion$ = this.inscripcioneServices.obtenerInscripciones();
    this.InscripcionesSubs = this.inscripcion$.subscribe((inscripcions:Inscripciones[]) => {
      this.inscripciones = inscripcions
    })

    this.sesion$ = this.sesionService.obtenerDatosSesion();
    this.subscription = this.sesion$.subscribe(
      (sesion: Sesion) => (this.sesion = sesion));

    this.dataSource = new MatTableDataSource<Inscripciones>(this.inscripciones)
  }

  ngOnDestroy(): void {
    this.InscripcionesSubs.unsubscribe();
    this.subscription.unsubscribe();
  }

  eliminarInscripcion(elemento: Inscripciones) {
    this.inscripcioneServices.eliminarInscripciones(elemento).subscribe(() => {
      this.inscripcion$ = this.inscripcioneServices.obtenerInscripciones();
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se elimno correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
