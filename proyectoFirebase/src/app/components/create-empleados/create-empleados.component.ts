import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrService, provideToastr } from 'ngx-toastr';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrl: './create-empleados.component.css'
})
export class CreateEmpleadosComponent
{
  createEmpleado: FormGroup;
  submitted:boolean = false;
  loading:boolean = false;


  //usamos formularios reactivos, toastr y inyectamos el servicio
  constructor(private fb: FormBuilder, private toastr: ToastrService, private empleadoService:EmpleadosService, private router: Router)
  {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento:['', Validators.required],
      salario:['', Validators.required]
    })
  }

  agregarEmpleado():any
  {
    //console.log(this.createEmpleado);

    if(this.createEmpleado.value.nombre == '' || this.createEmpleado.value.nombre == ' ' || this.createEmpleado.value.nombre == null)
    {
       this.submitted = true;
        return this.toastr.error('Error: el campo nombre no puede ser vacio');
    }

    if(this.createEmpleado.value.apellido == '' || this.createEmpleado.value.apellido == ' ' || this.createEmpleado.value.apellido == null)
    {
        this.submitted = true;
        return this.toastr.error('Error: el campo apellido no puede ser vacio');
    }

    if(this.createEmpleado.value.documento == '' || this.createEmpleado.value.documento == ' ' || this.createEmpleado.value.documento == null)
    {
        this.submitted = true;
        return this.toastr.error('Error: el campo documento no puede ser vacio');
    }

    if(this.createEmpleado.value.salario == '' || this.createEmpleado.value.salario == ' ' || this.createEmpleado.value.salario == null)
    {
        this.submitted = true;
        return this.toastr.error('Error: el campo salario no puede ser vacio');
    }

    if(this.createEmpleado.invalid)
    {
      this.submitted = true;
      return this.toastr.error('Error: Todos los campos son obligatorios');
    }

    const empleado:any =
    {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    console.log(empleado);

    //enviar a firebase
    this.loading = true;

    this.empleadoService.agregarEmpleado(empleado).then(() =>
    {
      this.toastr.success('Exito: empleado registrado con exito');
      this.loading = false;
      //se redirecciona con exito
      this.router.navigate(['/list-empleados'])

    }).catch( error =>
    {
      this.loading = false;
      this.toastr.error('Error: ocurrio un error al insertar el empleado ',error);
    });


  }

}
