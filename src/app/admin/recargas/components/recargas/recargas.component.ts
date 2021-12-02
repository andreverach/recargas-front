import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Recarga } from '@core/models/recarga';
import { RecargasService } from '@core/services/recargas/recargas.service';
import { DialogCipComponent } from '@shared/components/dialog-cip/dialog-cip.component';
import { SnackbarConfig } from '@shared/utils/snackbar-config';
import { merge } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { RecargasDatasource } from './recargas-datasource';

@Component({
  selector: 'app-recargas',
  templateUrl: './recargas.component.html',
  styleUrls: ['./recargas.component.scss']
})
export class RecargasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  recargasDatasource!: RecargasDatasource;
  displayedColumns!: string[];
  constructor(      
    private _snackBar: MatSnackBar,    
    private recargasService: RecargasService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.displayedColumns = [
      "quantity",
      "amount", 
      "cip",
      "status",
      "created_at",
      "updated_at",
      "actions"
    ];

    this.recargasDatasource = new RecargasDatasource(this.recargasService);

    this.recargasDatasource.loadClientes(
      10,
      "created_at", 
      "asc", 
      0
    );

    this.checkService();
  }

  ngAfterViewInit() {
    // reseteamos el paginador despues de ordenar
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);    
    // al ordenar o paginar, cargo una nueva pagina
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(      
      tap(() => this.loadRecargasPage())
    )
    .subscribe();
  }

  loadRecargasPage(): void {    
    let sortOrder = this.sort.direction || 'asc';
    this.recargasDatasource.loadClientes(
      this.paginator.pageSize,
      this.getSortColumn(this.sort), 
      sortOrder,
      this.paginator.pageIndex     
    );    
  }

  onRowClicked(row: Recarga) {
    // console.log(row);
  }

  private getSortColumn(sort: MatSort): string {
    //solamente quiero ordenar por id
    switch(sort.active) {
      case "created_at": return "created_at";
      case "updated_at": return "updated_at";
      default: return sort.active;
    };
  }

  onFilter() {
    this.paginator.pageIndex = 0;
    this.loadRecargasPage();
  }
  checkService(){
    this.recargasDatasource.snackBar$.subscribe((res: any) => {
      if(res.type){
        SnackbarConfig.showSnackBar(this._snackBar, res.message);
      }
    });
  }

  openDialog(recarga: any): void {
    const dialogRef = this.dialog.open(DialogCipComponent, {
      width: '400px',
      data: {
        cliente: recarga.player, 
        recarga: recarga
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){//existe un resultado
        //console.log(result.value.cip)
        this.saveRecarga(result.value);        
      }else{
        console.log('ha cancelado');
      }
    });
  }

  saveRecarga(recarga:Partial<Recarga>){
    this.recargasService.apiFinalizarRecarga(recarga)    
    .subscribe((rta: any) => {
      this.loadRecargasPage();
      SnackbarConfig.showSnackBar(this._snackBar, rta.message);
    },
    error => {
      SnackbarConfig.showSnackBar(this._snackBar, error);
    });
  } 

}
