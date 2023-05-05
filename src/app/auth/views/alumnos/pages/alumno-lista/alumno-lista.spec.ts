import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AlumnosService } from '../../services/alumnos.service';
import { AlumnoListaComponent } from './alumno-lista.component';
import { AlumnosModule } from '../../alumnos.module';

describe('Testing de lista de Alumnos', () => {
    let component: AlumnoListaComponent;
    let fixture: ComponentFixture<AlumnoListaComponent>;
    let alumnoService: AlumnosService;
    let spyLoadAlumnos: jasmine.Spy;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule,
                AlumnosModule,
                BrowserAnimationsModule,
                NoopAnimationsModule
            ],
            declarations: [
                AlumnoListaComponent
            ],
            providers:[
                AlumnosService
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(AlumnoListaComponent);
        component = fixture.componentInstance;
        alumnoService = TestBed.inject(AlumnosService);
        spyLoadAlumnos = spyOn(alumnoService, 'obtenerAlumnos').and.callThrough();
        fixture.detectChanges();
    })

    it('Creando Componente Alumnos', () => {
        expect(component).toBeTruthy();
    })

    it('Debe Listar Todos Los Alumnos Disponibles', () => {
        component.ngOnInit();
        expect(spyLoadAlumnos).toHaveBeenCalled()
    })
})