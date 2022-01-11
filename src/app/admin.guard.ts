import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
//con tap podemos debugear en pipes
//osea con el uso de tap podemos mosrtar mensajes en consola sin interrumpir el proceso de la fncion
import { map, tap } from 'rxjs/operators';

//importasmos el servicio de fire
import { AuthService } from './core/services/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  //creamos un constructor
  //inyectamos el servicio
  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;//aqui depende si es tru o false dejara entrar a la ruta
    //aqui mediante un pipe con map devolvemos tru o false depende de si el usuario esta conectado
    return this.authService.hasUser().pipe(
      map(user => user === null ? false : true),
      tap(rpta => {//de esta manera tambien podemos redirigir usando el tap
        if(!rpta)
          this.router.navigate(['/admin/login']);
      })
      /*tap(user => console.log(user)),//esto se ejecutara pero no interrumpira el proceso
      map(user => {
        if(user === null){//si no hay usuario entonces redirecciona al inicio
          return this.router.parseUrl('/');
        }
        return true;       
      })*/
    );
  }
  
}


/**
 * las diferentes tipos de guardian
 * canActivate: poder entrar a una ruta
 * 
 */