import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

//modelo
import { Recarga } from '@core/models/recarga';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecargasService {  

  constructor(
    private httpClient: HttpClient
  ) { }  

  apiStoreRecargas(recarga: Partial<Recarga>){//ya que no enviare todos los campos de este modelo
    //envio la url y separado con coma el cuerpo que seria el producto
    return this.httpClient.post(`${environment.apiV2}players/store-recharge`, recarga)
      .pipe(
        catchError(this.handleError)
      );
  }

  apiFinalizarRecarga(recarga: Partial<Recarga>){
    return this.httpClient.post(`${environment.apiV2}players/recharge-finish/${recarga.id}`, recarga)
      .pipe(
        catchError(this.handleError)
      );
  }

  apiRecargasAll(
    itemsPerPage: number,
    sortColumn: string,
    sortOrder: string,
    page: number = 0

  ) : Observable<Recarga[]>{
    const url = `${environment.apiV2}recharges/recharges-all`;    
    page += 1;    
    return this.httpClient.get(url, {
        params: new HttpParams()
          .set('itemsPerPage', itemsPerPage.toString())
          .set('sortColumn', sortColumn)
          .set('sortOrder', sortOrder)
          .set('page', page.toString())
      })
      .pipe(
        retry(3),
        catchError(this.handleError),
        map(
          (response: any) => response
        )
      );
  }

  private handleError(error: HttpErrorResponse){
    //console.log(error);
    return throwError('Whoops! Por favor intentar nuevamente.');
  }
}
