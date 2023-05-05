import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlumnosModule } from '../../alumnos.module';
import { AlumnosService } from "../../services/alumnos.service";
import { FormularioComponent } from "./formulario.component"

describe('Testing de Formulario Alumno', () => {
    let component: FormularioComponent;
    let fixture: ComponentFixture<FormularioComponent>;
    let alumnoService: AlumnosService;
    let spyCreateAlumnos: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                AlumnosModule
            ],
            declarations: [
                FormularioComponent
            ],
            providers: [
                AlumnosService
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FormularioComponent);
        component = fixture.componentInstance;
        alumnoService = TestBed.inject(AlumnosService);
        spyCreateAlumnos = spyOn(alumnoService, 'agregarAlumno').and.callThrough();
        fixture.detectChanges();
    });

    it('Creando Component Formulario', () => {
        expect(component).toBeTruthy();
    })

    it('Debe Agregar un Curso', () => {
        component.alumnosFormulario.patchValue({
            id: 'Prueba',
            nombre: 'Nombre de Prueba',
            apellido: 'Apellido de Prueba',
            dni: 'DNI de prueba',
            nameUsuario: 'Usuario de prueba'
        })
        component.createProduct();
        expect(spyCreateAlumnos).toHaveBeenCalledWith(component.alumnosFormulario.value)
    })
})