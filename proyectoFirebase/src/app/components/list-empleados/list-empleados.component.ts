import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrl: './list-empleados.component.css'
})
export class ListEmpleadosComponent implements OnInit
{
  empleados: any[] = [];
  loading:boolean = false;
  constructor(private empleadoService:EmpleadosService,private toastr: ToastrService, private router:Router){}

  ngOnInit(): void
  {
    //throw new Error('Method not implemented.');
    this.obtenerEmpleados();
  }

  eliminarEmpleado(id:string)
  {
    swal({
      title: "Eliminar?",
      text: "Esta Seguro que desea eliminar este registro",
      icon: "danger",
      buttons: ["Cancelar", "Ok"],
      dangerMode: true,
    })
    .then((willDelete) =>
    {
      if (willDelete)
      {
        this.empleadoService.eliminarEmpleado(id).then(()=>
        {
          //this.toastr.success('Empleado eliminado correctamente');
          swal("Empleado eliminado correctamente", {
            icon: "success",
          });
        }).catch((error) =>
        {
          //this.toastr.error('Error eliminando un empleado', error);
          swal("Error intentando eliminar el empleado", {
            icon: "error",
          });
        });

      } else
      {
        //le da en cancelar
        //swal("Your imaginary file is safe!");
      }
    });



  }

 obtenerEmpleados()
 {
  this.loading = true;
  //como es un observable nos tenemos que suscribir
   this.empleadoService.obtenerEmpleados().subscribe(data =>
   {
    this.empleados = [];
      //recorremos registro a registro que nos devuelve firebase
      data.forEach((element:any) =>
      {
        //accedemos al id que contiene cada registro
        //console.log(element.payload.doc.id);
        //accedemos a la informacion de cada registro
        //console.log(element.payload.doc.data());

        //agregamos al array la informacion que se obtiene desde firebase
        this.empleados.push({
          id: element.payload.doc.id,
          //al id se le crea una copia de la informacion que trae cada id de documento desde firebase
          ...element.payload.doc.data()
        });
        this.loading = false;
      });
      //this.empleados = data;
   },(error) =>
   {
      this.loading = false;
      this.toastr.error('Error: obteniendo la informacion desde firebase', error);
   });
 }

}
