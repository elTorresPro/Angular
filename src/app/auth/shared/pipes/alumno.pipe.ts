import { Pipe, PipeTransform } from '@angular/core';
import { Alumnos } from '../../views/alumnos/model/alumnos';

@Pipe({
  name: 'alumno'
})
export class AlumnoPipe implements PipeTransform {

  transform(value: Alumnos): string{

    return `${value.nombre} ${value.apellido}` ;
  }

}
