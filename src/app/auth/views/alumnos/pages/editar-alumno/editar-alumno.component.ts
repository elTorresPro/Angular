import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Alumnos } from '../../model/alumnos';
import { AlumnosService } from '../../services/alumnos.service';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit{

  alumno: Alumnos;
  formularioEditable: FormGroup;
  id!: number

  constructor(
    private activatedRouted: ActivatedRoute,
    private alumnoService: AlumnosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRouted.paramMap.subscribe((data) => {
      this.id = parseInt(data.get('id') || '')
      this.formularioEditable = new FormGroup({
        nombre: new FormControl(data.get('nombre')),
        apellido: new FormControl(data.get('apellido')),
        dni: new FormControl(data.get('dni')),
        nameUsuario: new FormControl(data.get('nameUsuario')),
      })
    })
  }

  editarAlumno() {
    let alumnos: Alumnos = {
      id: this.id,
      nombre: this.formularioEditable.value.nombre,
      apellido: this.formularioEditable.value.apellido,
      dni: this.formularioEditable.value.dni,
      nameUsuario: this.formularioEditable.value.nameUsuario,
    }
    this.alumnoService.editarAlumno(alumnos).subscribe(()=>this.router.navigate(['/alumnos']));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se editor correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
