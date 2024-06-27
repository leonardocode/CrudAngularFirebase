import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{

  public firebaseConfig:any = {
    apiKey: "AIzaSyBR_vhCQeM2KcuEHzm3clbJuDpoAwcWZ6k",
    authDomain: "crudtareas-3665c.firebaseapp.com",
    projectId: "crudtareas-3665c",
    storageBucket: "crudtareas-3665c.appspot.com",
    messagingSenderId: "906634271690",
    appId: "1:906634271690:web:31fffbc45f67e91f6e0d33",
    measurementId: "G-F3387LXFNW"
  };

  // Initialize Firebase
  public app:any;
  public analytics:any

  constructor()
  {
    this.app = initializeApp(this.firebaseConfig);
    this.analytics = getAnalytics(this.app);
  }

}
