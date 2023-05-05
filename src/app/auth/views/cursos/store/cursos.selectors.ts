import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CursoState } from '../model/curso.state';
import * as fromCursos from './cursos.reducer';

export const selectCursosState = createFeatureSelector<CursoState>(
  fromCursos.cursosFeatureKey
);

export const selectCursosCargados = createSelector(
  selectCursosState,
  (state: CursoState) => state.cargando
)

export const selectCursos = createSelector(
  selectCursosState,
  (state: CursoState) => state.cursos
)
