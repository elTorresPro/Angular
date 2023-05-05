import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Sesion } from '../../../sessions/model/sesion';
import { SesionService } from '../../../sessions/services/sesion.service';
import { Alumnos } from '../../model/alumnos';
import { AlumnosService } from '../../services/alumnos.service';

@Component({
  selector: 'app-alumno-lista',
  templateUrl: './alumno-lista.component.html',
  styleUrls: ['./alumno-lista.component.css']
})
export class AlumnoListaComponent implements OnInit, OnDestroy {

  alumno: Alumnos;
  alumnos: Alumnos[];
  alumnosSubcription!: Subscription
  alumnos$!: Observable<Alumnos[]>

  dataSource: MatTableDataSource<Alumnos>
  displayedColumns: string[] = ['id', 'nombre', 'dni', 'nameUsuario', 'eliminar'];

  sesion$:Observable<Sesion>;
  subscription: Subscription;
  sesion: Sesion;

  constructor(
    private alumnoService: AlumnosService,
    private sesionService: SesionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.alumnos$ = this.alumnoService.obtenerAlumnos();
    this.alumnosSubcription = this.alumnos$.subscribe((alumnos: Alumnos[]) => {
      this.alumnos = alumnos
    })

    this.sesion$ = this.sesionService.obtenerDatosSesion();
    this.subscription = this.sesion$.subscribe(
      (sesion: Sesion) => (this.sesion = sesion));

    this.dataSource = new MatTableDataSource<Alumnos>(this.alumnos);
  }

  editarAlumno(alumno: Alumnos) {
    this.router.navigate(['/alumnos/edit', alumno])
  }

  eliminarAlumno(elemento: Alumnos) {
    this.alumnoService.eliminarAlumno(elemento).subscribe(() => {
      this.alumnos$ = this.alumnoService.obtenerAlumnos();
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se elimno correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  applyFilter(event: Event) {
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.alumnos$ = this.alumnoService.obtenerAlumnos().pipe(
      map(c => c.filter(
        alumno => alumno.nombre.toLocaleLowerCase().includes(valorObtenido.toLocaleLowerCase())
      ))
    );
  }

  ngOnDestroy(): void {
    this.alumnosSubcription.unsubscribe();
    this.subscription.unsubscribe();
  }
}
