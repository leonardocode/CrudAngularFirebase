import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CreateEmpleadosComponent } from './components/create-empleados/create-empleados.component';
import { EditEmpleadosComponent } from './components/edit-empleados/edit-empleados.component';

const routes: Routes = [
  {
    path:'list-empelados',
    component:ListEmpleadosComponent
  },
  {
    path:'create-empleado',
    component:CreateEmpleadosComponent
  },
  {
    //se le va a pasar el id dinamicamente para buscar por ese id
    path:'edit-empleado/:id',
    component:EditEmpleadosComponent
  },
  {
    path:'',
    redirectTo:'list-empleados',
    pathMatch:'full'
  },
  {
    //cualquier cosa que no sea una url valida, redireccione a listempleadocomponent
    path:'**',
    component:ListEmpleadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
