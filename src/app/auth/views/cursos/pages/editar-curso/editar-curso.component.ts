import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Curso } from '../../model/cursos';
import { CursosService } from '../../services/cursos.service';


@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {

  formulario: FormGroup;
  id: number;

  constructor(
    private activatedRouted: ActivatedRoute,
    private cursoService: CursosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRouted.paramMap.subscribe((parametros) => {
      
      this.id = parseInt(parametros.get('id') || '');
      this.formulario = new FormGroup({
        nombreCurso: new FormControl(parametros.get('nombreCurso')),
        info:new FormControl(parametros.get('info')),
        comision: new FormControl(parametros.get('comision')),
        profesor: new FormControl(parametros.get('profesor')),
        inicio: new FormControl(parametros.get('fechaInicio')),
        fin: new FormControl(parametros.get('fechaFin')),
        img: new FormControl(parametros.get('img')),
      });
    });
  }

  editarCurso() {
    let c: Curso = {
      id: this.id,
      nombreCurso: this.formulario.value.nombreCurso,
      info:this.formulario.value.info,
      comision: this.formulario.value.comision,
      profesor: this.formulario.value.profesor,
      fechaInicio: this.formulario.value.fechaInicio,
      fechaFin: this.formulario.value.fechaFin,
      img: this.formulario.value.img,
    };
    this.cursoService.editarCurso(c);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Los Datos fueron actualizados',
      showConfirmButton: false,
      timer: 1500,
    });
    this.router.navigate(['/cursos']);
  }
}
