import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Alumnos } from '../../model/alumnos';
import { AlumnosService } from '../../services/alumnos.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit, OnDestroy{

  alumnos: Alumnos[];
  alumnoSubcription: Subscription;
  alumnosFormulario: FormGroup;
  id: number;

  constructor(
    private alumnoService : AlumnosService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.alumnoSubcription = this.alumnoService.obtenerAlumnos().subscribe((alumno) => this.alumnos = alumno)

    this.alumnosFormulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido:new FormControl('', [Validators.required]),
      dni:new FormControl('', [Validators.required]),
      nameUsuario:new FormControl('', [Validators.required]),
    })
  }

  guardarAlumno(){
    let idAlumno:number = Math.max.apply(null, this.alumnos.map(o => o.id));

    let student : Alumnos = {
      id: idAlumno+1,
      nombre: this.alumnosFormulario.value.nombre,
      apellido:this.alumnosFormulario.value.apellido,
      dni:this.alumnosFormulario.value.dni,
      nameUsuario:this.alumnosFormulario.value.nameUsuario
    }
    this.alumnoService.agregarAlumno(student).subscribe(()=>this.router.navigate(['/alumnos']));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Agrego un nuevo Alumno',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  ngOnDestroy(): void {
    this.alumnoSubcription.unsubscribe();
  }

    /*FUNCION PARA EL TESTING*/
    createProduct() {
      if (this.alumnosFormulario.valid) {
        this.alumnoService.agregarAlumno(this.alumnosFormulario.value);
      } else {
        alert('El formulario es invalido');
      }
    }
}
