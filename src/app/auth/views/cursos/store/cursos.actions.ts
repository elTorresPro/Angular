import { createAction, props } from '@ngrx/store';
import { Curso } from '../model/cursos';

// CARGAR CURSOS
export const loadCursoss = createAction(
  '[Cursos] Load Cursoss'
);

// CARGAR CURSOS EXISTOSO
export const loadCursossSuccess = createAction(
  '[Cursos] Load Cursoss Success',
  props<{ cursos: Curso[]}>()
);

// CARGAR CURSOS ERROR
export const loadCursossFailure = createAction(
  '[Cursos] Load Cursoss Failure',
  props<{ error: any }>()
);

// CREAR CURSO
export const agregarCurso = createAction(
  '[Cursos] Agregar Curso',
  props<{ curso: Curso}>()
);

// CREAR CURSO EXISTOSO
export const agregarCursoSucess = createAction(
  '[Course] Create Course Success',
  props<{ curso: Curso}>()
)

// CREAR CURSO FALLO
export const agregarCursoFailure = createAction(
  '[Course] Create Course Failure',
  props<{ error: any }>()
)

export const editarCurso = createAction(
  '[Cursos] Editar Curso',
  props<{ curso: Curso}>()
);

// ELIMINAR CURSO EXISTOSO
export const eliminarCurso = createAction(
  '[Cursos] Eliminar Curso',
  props<{ curso: Curso}>()
)

export const resetCourseState = createAction('[Course] Reset Course State')