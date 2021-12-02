import { CollectionViewer, DataSource } from '@angular/cdk/collections';
//para reactivos
import { BehaviorSubject, Observable } from 'rxjs';
//manejo de resultados
import { finalize } from 'rxjs/operators';
//modelo y servicio
import { Recarga } from '@core/models/recarga';
import { RecargasService } from '@core/services/recargas/recargas.service';

export class RecargasDatasource extends DataSource<Recarga> {
    //creamos los comportamientos    
    private recargaBehaviorSubject = new BehaviorSubject<Recarga[]>([]);
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
  
    constructor(private recargasService: RecargasService) {
      super();
    }
  
    connect(collectionViewer: CollectionViewer): Observable<Recarga[]> {
      return this.recargaBehaviorSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
      this.recargaBehaviorSubject.complete();
      this.loadingBehaviorSubject.complete();
      this.countBehaviorSubject.complete();
      this.snackBarBehaviorSubject.complete();
    }
  
    loadClientes(
      itemsPerPage: number,
      sortColumn: string = "created_at", 
      sortOrder: string = "desc",
      page: number      
      ) {
      this.snackBarBehaviorSubject.next({
        type: false,
        message: ''
      });
      this.loadingBehaviorSubject.next(true);
      this.recargasService.apiRecargasAll(
        itemsPerPage,
        sortColumn, 
        sortOrder,        
        page
      )
      .pipe(
        finalize(() => this.loadingBehaviorSubject.next(false))
      )
      .subscribe((res: any) => {
        this.countBehaviorSubject.next(res.meta.total);
        this.recargaBehaviorSubject.next(res.data);
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