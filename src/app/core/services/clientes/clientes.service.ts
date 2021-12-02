import { Injectable } from '@angular/core';

//consumir api
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
//modelo
import { Cliente } from '@core/models/cliente';
import { environment } from 'src/environments/environment';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  _cliente !: Cliente;

  constructor(
    private httpClient: HttpClient
  ) { }

  apiPlayersAll(
    itemsPerPage: number,
    sortColumn: string,
    sortOrder: string,
    page: number = 0,
    id: string,
    code: string,
    username: string,
    fullname: string

  ) : Observable<Cliente[]>{
    //retornar lista de clientes
    const url = `${environment.apiV2}players/players-all`;
    //sin ser observable, tipamos
    //return this.httpClient.get<Cliente[]>(url);
    //siendo observable no tipamos porque tipamos en el observable
    page += 1;    
    return this.httpClient.get(url, {
        params: new HttpParams()
          .set('itemsPerPage', itemsPerPage.toString())
          .set('sortColumn', sortColumn)
          .set('sortOrder', sortOrder)
          .set('page', page.toString())
          .set('id', id === null ? '': id)
          .set('code', code  === null ? '': code)
          .set('username', username  === null ? '': username)
          .set('fullname', fullname  === null ? '': fullname)          
      })
      .pipe(
        retry(3),
        catchError(this.handleError),
        map(//no lo tipo en este caso para poder acceder a mas datos del array en el componente
          (response: any) => /*(response.data) as Cliente[]*/ response
        )
      );
  }

  apiPlayerDetail(){
    return this._cliente;
  }

  apiPlayerStore(cliente: Cliente){
    return this.httpClient.post(`${environment.apiV2}players/store-player`, cliente)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse){
    let message = 'Whoops! Por favor intentar nuevamente.';
    if(error){
      if(error.status === 422){
        //son las unicas validaciones en el request del backend
        if(error.error.errors.username){//si existe error de username
          message = error.error.errors.username[0];//obtengo el unico que existe segun mi request
        }else{
          if(error.error.errors.code){
            message = error.error.errors.code[0];
          }
        }
      }
    }
    //mediante este trhow error puedo enviar no solo un mensaje
    //sino que puedo enviar un arreglo con el mensaje y aparte errors osea el array de errores
    //del formulario y ya renderizar en la vista el error con clases o algo parecido
    //ejm: en el control username le colocamos una clase username de manera que me pueda referir rapido
    //haecmos un for $('.username').addClass(error) o append mensaje o algo asi para mejorar la vista
    //de los errores sino simplemente mostrar un mensaje
    return throwError(message);
  }
}
