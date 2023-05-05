import { createReducer, on } from '@ngrx/store';
import { CursoState } from '../model/curso.state';
import * as CursosActions from './cursos.actions';

export const cursosFeatureKey = 'cursos';


export const initialState: CursoState = {
  cargando: false,
  cursos: []
};

export const reducer = createReducer(
  initialState,

  on(CursosActions.loadCursoss, (state) => {
    return {...state, cargando: true};
  }),
  on(CursosActions.loadCursossSuccess, (state, {cursos}) => {
    return {...state, cargando: false, cursos}
  }),
  on(CursosActions.loadCursossFailure, (state, {error}) => {
    return state
  }),
  on(CursosActions.agregarCurso, (state, {curso}) => {
    return state
  }),
  on(CursosActions.editarCurso, (state, {curso}) => {
    return state
  }),
  on(CursosActions.editarCurso, (state, {curso}) => {
    return state
  }),
  on(CursosActions.eliminarCurso, (state, {curso}) => {
    return state
  }),
  on(CursosActions.resetCourseState, () => initialState)

);
