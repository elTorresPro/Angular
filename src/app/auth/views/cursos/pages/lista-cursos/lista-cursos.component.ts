import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Sesion } from '../../../sessions/model/sesion';
import { SesionService } from '../../../sessions/services/sesion.service';
import { CursoState } from '../../model/curso.state';
import { Curso } from '../../model/cursos';
import { CursosService } from '../../services/cursos.service';
import { eliminarCurso, loadCursoss } from '../../store/cursos.actions';
import { selectCursos } from '../../store/cursos.selectors';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit, OnDestroy {

  cursos$!: Observable<Curso[]>;

  sesion$:Observable<Sesion>;
  subscription: Subscription;
  sesion: Sesion;

  constructor(
    private store: Store<CursoState>,
    private cursosService: CursosService,
    private sesionService: SesionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cursos$ = this.store.select(selectCursos);
    this.store.dispatch(loadCursoss())

    this.sesion$ = this.sesionService.obtenerDatosSesion();
    this.subscription = this.sesion$.subscribe(
      (sesion: Sesion) => (this.sesion = sesion));
  }

  editarCurso(curso: Curso) {
    this.router.navigate(['/cursos/edit', curso]);
  }

  eliminarCurso(curso: Curso) {
    this.store.dispatch(eliminarCurso({ curso }));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se elimno el Curso',
      showConfirmButton: false,
      timer: 1500,
    });
    this.cursos$ = this.store.select(selectCursos);
  }

  filtrarCurso(event: Event) {
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.cursos$ = this.cursosService
      .obtenerCursos()
      .pipe(
        map((c) =>
          c.filter((curso) =>
            curso.nombreCurso
              .toLocaleLowerCase()
              .includes(valorObtenido.toLocaleLowerCase())
          )
        )
      );
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
