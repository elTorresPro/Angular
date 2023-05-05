import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Curso } from '../../model/cursos';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Inscripciones } from '../../../inscripciones/model/inscripciones';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.css']
})
export class DetalleCursoComponent implements OnInit, OnDestroy {

  curso$: Observable<Curso>;
  cursoSubscription: Subscription;
  curso: Curso;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursoService: CursosService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parametros) => {
      let id = parseInt(parametros.get('id') || '0');
      this.curso$ = this.cursoService.obtenerCurso(id)
    });
    this.cursoSubscription = this.curso$.subscribe(
      (curso: Curso) => (this.curso = curso)
    );
  }
  ngOnDestroy(): void {
    this.cursoSubscription.unsubscribe();
  }
}
