import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService
{
   public firebaseConfig =
   {
    apiKey: "AIzaSyBR_vhCQeM2KcuEHzm3clbJuDpoAwcWZ6k",
    authDomain: "crudtareas-3665c.firebaseapp.com",
    projectId: "crudtareas-3665c",
    storageBucket: "crudtareas-3665c.appspot.com",
    messagingSenderId: "906634271690",
    appId: "1:906634271690:web:31fffbc45f67e91f6e0d33",
    measurementId: "G-F3387LXFNW"
  };

  // Initialize Firebase
  public app = initializeApp(this.firebaseConfig);
  public analytics = getAnalytics(this.app);

  constructor(private firestore:AngularFirestore) { }

  agregarEmpleado(empleado:any): Promise<any>
  {
    //agrega en la base de datos de firestore un empleado
    return this.firestore.collection('empleados').add(empleado);
  }

  obtenerEmpleadoPorId(id:string):Observable<any>
  {
    //consulta la informacion de un empleado por el id
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }


  obtenerEmpleados():Observable<any>
  {
    //retorna la informacion de firebase en tiempo real, y se ordena la informacion de manera descendente
    return this.firestore.collection('empleados', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
  }

  editarEmpleado(empleado:any):Promise<any>
  {
    //edita el registro por el id y se le envia toda la informacion que se quiere editar
    return this.firestore.collection('empleados').doc(empleado.id).update(empleado);
  }

  eliminarEmpleado(id:string):Promise<any>
  {
    //elimina el registros por el id de firebase
    return this.firestore.collection('empleados').doc(id).delete();
  }
}
