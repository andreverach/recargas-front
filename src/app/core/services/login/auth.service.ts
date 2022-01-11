import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//con tap recordemos que nos deja ejecutar alguna instruccion sin interrumpir el proceso
import { tap } from 'rxjs/operators';
//importamos al servicio de token para obtenerlo
//aqui lo usamos para guardar en ellocalstorage el token


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private http: HttpClient,

  ) { }


  login(email:string, password: string){
    //devolvemos la promesa
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.angularFireAuth.signOut();
  }

  hasUser(){//esta funcion la hacemos para verificar si hay algfuiehn loueado
    return this.angularFireAuth.authState;
    /*.subscribe(user => {
      console.log(user === null);
    });*/
  }

  
}
