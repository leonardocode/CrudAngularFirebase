import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrService, provideToastr } from 'ngx-toastr';
import { EmpleadosService } from '../../services/empleados.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-empleados',
  templateUrl: './edit-empleados.component.html',
  styleUrl: './edit-empleados.component.css'
})
export class EditEmpleadosComponent implements OnInit
{
  empleado:any[] = [];
  editarEmpleadoBD: FormGroup;
  submitted:boolean = false;
  loading:boolean = false;
  //variable que va a capturar el id enviado desde el componente listado
  id:any = '';


  //usamos formularios reactivos, toastr y inyectamos el servicio
  //para capturar el id que envian desde el componente listado usamos la directiva ActivatedRoute
  constructor(private fb: FormBuilder, private toastr: ToastrService, private empleadoService:EmpleadosService, private router: Router, private aRoute:ActivatedRoute)
  {
    this.editarEmpleadoBD = this.fb.group({
      id:['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento:['', Validators.required],
      salario:['', Validators.required]
    })
  }

  ngOnInit(): void
  {
    //throw new Error('Method not implemented.');

    //capturamos el id del registro que queremos editar enviado desde el listado para poder realizar el update
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.consultarEmpleado(this.id);
  }

  consultarEmpleado(id:any)
  {
    this.loading = true;
      this.empleadoService.obtenerEmpleadoPorId(id).subscribe(data =>
      {
          //console.log(data.payload.data());
          //para obtener la data de un atributo en especifico data.payload.data()['nombre']
          //rellenamos los datos usando reactive forms
          this.editarEmpleadoBD.setValue
          ({
            id:this.id,
            nombre:data.payload.data()['nombre'],
            apellido: data.payload.data()['apellido'],
            documento:data.payload.data()['documento'],
            salario:data.payload.data()['salario']
          });
          this.loading = false;
      },(error) =>
      {
        this.loading = false;
        this.toastr.error('Error al consultar empleado por id',error);
      })
  }

  editarEmpleado():any
  {
    //console.log(this.createEmpleado);

    if(this.editarEmpleadoBD.value.nombre == '' || this.editarEmpleadoBD.value.nombre == ' ' || this.editarEmpleadoBD.value.nombre == null)
    {
       this.submitted = true;
        return this.toastr.error('Error: el campo nombre no puede ser vacio');
    }

    if(this.editarEmpleadoBD.value.apellido == '' || this.editarEmpleadoBD.value.apellido == ' ' || this.editarEmpleadoBD.value.apellido == null)
    {
        this.submitted = true;
        return this.toastr.error('Error: el campo apellido no puede ser vacio');
    }

    if(this.editarEmpleadoBD.value.documento == '' || this.editarEmpleadoBD.value.documento == ' ' || this.editarEmpleadoBD.value.documento == null)
    {
        this.submitted = true;
        return this.toastr.error('Error: el campo documento no puede ser vacio');
    }

    if(this.editarEmpleadoBD.value.salario == '' || this.editarEmpleadoBD.value.salario == ' ' || this.editarEmpleadoBD.value.salario == null)
    {
        this.submitted = true;
        return this.toastr.error('Error: el campo salario no puede ser vacio');
    }

    if(this.editarEmpleadoBD.invalid)
    {
      this.submitted = true;
      return this.toastr.error('Error: Todos los campos son obligatorios');
    }

    const empleado:any =
    {
      id: this.id,
      nombre: this.editarEmpleadoBD.value.nombre,
      apellido: this.editarEmpleadoBD.value.apellido,
      documento: this.editarEmpleadoBD.value.documento,
      salario: this.editarEmpleadoBD.value.salario,
      fechaActualizacion: new Date()
    }
    //console.log(empleado);

    //enviar a firebase
    this.loading = true;

    this.empleadoService.editarEmpleado(empleado).then(() =>
    {
      this.toastr.success('Exito: empleado editado con exito');
      this.loading = false;
      //se redirecciona con exito
      this.router.navigate(['/list-empleados'])

    }).catch( error =>
    {
      this.loading = false;
      this.toastr.error('Error: ocurrio un error al editar el empleado ',error);
    });
  }



}
