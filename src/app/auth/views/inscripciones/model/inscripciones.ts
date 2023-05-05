import { Alumnos } from "../../alumnos/model/alumnos";
import { Curso } from '../../cursos/model/cursos';


interface inscripAlumno{
    id:number,
    nombre:string,
    apellido:string,
}

interface inscripCurso{
    id:number,
    nombreCurso:string,
}

export interface Inscripciones {
    id:number;
    codigo:string;
    alumno:inscripAlumno;
    fecha:Date;
    curso:inscripCurso;
}
