import { AlumnosService } from "./alumnos.service";
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';


describe('Testing de Api de Alumnos Service',() => {
    let httpClientspy: jasmine.SpyObj<HttpClient>;
    let alumnoService:AlumnosService;
    let ALUMNOS = [
        {
            id: 1,
            nombre: 'prueba1',
            apellido: 'prueba1',
            dni: 10,
            nameUsuario: 'prueba1@gmail.com',
        },
        {
            id: 2,
            nombre: 'prueba2',
            apellido: 'prueba2',
            dni: 10,
            nameUsuario: 'prueba2@gmail.com',
        },
        {
            id: 3,
            nombre: 'prueba3',
            apellido: 'prueba3',
            dni: 10,
            nameUsuario: 'prueba3@gmail.com',
        },
    ]

    beforeEach(() => {
        httpClientspy = jasmine.createSpyObj('httpClient', ['get']);
        alumnoService = new AlumnosService(httpClientspy);
    });

    describe('Api Testing Alumnos', () => {
        it('Llamando al Api TestingAlumnos', () => {
            httpClientspy.get.and.returnValue(of(ALUMNOS));
            alumnoService.testingAlumnos().subscribe({
                next:(alumnos) => {
                    setTimeout(() => {
                        expect(alumnos).toEqual(ALUMNOS);
                    },200)
                },
                error:() => {

                }
            })
            expect(httpClientspy.get).toHaveBeenCalledTimes(1);
        })
    })
})