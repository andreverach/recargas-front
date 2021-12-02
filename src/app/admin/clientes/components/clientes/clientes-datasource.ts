import { CollectionViewer, DataSource } from '@angular/cdk/collections';
//para reactivos
import { BehaviorSubject, Observable } from 'rxjs';
//manejo de resultados
import { finalize } from 'rxjs/operators';
//modelo y servicio
import { Cliente } from '@core/models/cliente';
import { ClientesService } from '@core/services/clientes/clientes.service';

export class ClientesDatasource extends DataSource<Cliente> {
    //creamos los comportamientos    
    private clienteBehaviorSubject = new BehaviorSubject<Cliente[]>([]);
    private loadingBehaviorSubject = new BehaviorSubject<boolean>(false);
    private countBehaviorSubject = new BehaviorSubject<number>(0);
    private snackBarBehaviorSubject = new BehaviorSubject<{}>({
      type: false,
      message: ''
    });
  
    //convertimos ese comportamiento a observable - consumir con async
    public loading$ = this.loadingBehaviorSubject.asObservable();
    public count$ = this.countBehaviorSubject.asObservable();
    public snackBar$ = this.snackBarBehaviorSubject.asObservable();    
  
    constructor(private clientesService: ClientesService) {
      super();
    }
  
    connect(collectionViewer: CollectionViewer): Observable<Cliente[]> {
      return this.clienteBehaviorSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
      this.clienteBehaviorSubject.complete();
      this.loadingBehaviorSubject.complete();
      this.countBehaviorSubject.complete();
      this.snackBarBehaviorSubject.complete();
    }
  
    loadClientes(
      itemsPerPage: number,
      sortColumn: string = "id", 
      sortOrder: string = "desc",       
      page: number,
      id: string,
      code: string,
      username: string,
      fullname: string
      ) {
      this.snackBarBehaviorSubject.next({
        type: false,
        message: ''
      });
      this.loadingBehaviorSubject.next(true);
      this.clientesService.apiPlayersAll(
        itemsPerPage,
        sortColumn, 
        sortOrder,        
        page,
        id,
        code,
        username,
        fullname
      )
      .pipe(
        //catchError(() => of([])),
        finalize(() => this.loadingBehaviorSubject.next(false))
      )
      .subscribe((res: any) => {
        //console.log('Datasource', res);
        //para poder acceder esta manera no lo tipo en el map del servicio
        this.countBehaviorSubject.next(res.meta.total);
        this.clienteBehaviorSubject.next(res.data);
      },
      error => {
        this.snackBarBehaviorSubject.next({
          type: true,
          message: error
        });
      }
      );
    }    
  }