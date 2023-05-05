import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Alumnos } from '../../../alumnos/model/alumnos';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Curso } from '../../../cursos/model/cursos';
import { CursosService } from '../../../cursos/services/cursos.service';
import { Inscripciones } from '../../model/inscripciones';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit, OnDestroy {

  formularioInscripcion: FormGroup;

  alumno!: Alumnos;
  alumnos!: Alumnos[];
  alumnoSubscription!: Subscription;
  alumno$!: Observable<Alumnos[]>;

  curso$!: Observable<Curso[]>;
  cursosSub!: Subscription;
  cursos!: Curso[];

  constructor(
    private router: Router,
    private cursoService: CursosService,
    private alumnoService: AlumnosService,
    private inscripciones: InscripcionesService
  ) { }

  getAlumnosList(){
    this.alumno$ = this.alumnoService.obtenerAlumnos();
    this.alumnoSubscription = this.alumno$.subscribe(
      (alumnos: Alumnos[]) => (this.alumnos = alumnos)
    );
  }

  getCursosList(){
    this.curso$ = this.cursoService.obtenerCursos();
    this.cursosSub = this.curso$.subscribe(
      (curso: Curso[]) => (this.cursos = curso)
    );
  }

  ngOnInit(): void {
    this.getAlumnosList();
    this.getCursosList();
    this.formularioInscripcion = new FormGroup({
      codigo: new FormControl('', [Validators.required]),
      alumno: new FormGroup({
        nombre:new FormControl('', [Validators.required]),
        apellido:new FormControl('',[Validators.required])
      }),
      fecha: new FormControl('', [Validators.required]),
      curso: new FormGroup({
        nombreCurso:new FormControl('',[Validators.required]),
      }),
    });
  }

  guardarInscripcion(){
    let idAlumno:number = Math.max.apply(null, this.alumnos.map(o => o.id));

    let incripcion : Inscripciones = {
      id: idAlumno+1,
      codigo: this.formularioInscripcion.value.codigo,
      alumno:this.formularioInscripcion.value.alumno,
      fecha:this.formularioInscripcion.value.fecha,
      curso:this.formularioInscripcion.value.curso,
    }
    this.inscripciones.agregarInscripciones(incripcion).subscribe(()=>this.router.navigate(['/inscripciones']));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se ha inscrito un alumno',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  ngOnDestroy() {
    this.alumnoSubscription.unsubscribe();
    this.cursosSub.unsubscribe();
  }
}
