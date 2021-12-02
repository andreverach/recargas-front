import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
//comportamientos
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
//modelo
import { Cliente } from '@core/models/cliente';
import { Recarga } from '@core/models/recarga';
//servicio
import { ClientesService } from '@core/services/clientes/clientes.service';
import { RecargasService } from '@core/services/recargas/recargas.service';
//material table
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { MatTableDataSource } from '@angular/material/table';
//material snackbar
import { MatSnackBar } from '@angular/material/snack-bar';
//datasource
import { ClientesDatasource } from './clientes-datasource';
//clase donde tengo el snackbar
import { SnackbarConfig } from '@shared/utils/snackbar-config';
//dialogos
import { MatDialog } from '@angular/material/dialog';
import { DialogQuantityComponent } from '@shared/components/dialog-quantity/dialog-quantity.component';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  clientesDatasource!: ClientesDatasource;
  displayedColumns!: string[];
  filtersForm!: FormGroup;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private clientesService: ClientesService,
    private recargaService: RecargasService    
  ) { 
    
  }

  ngOnInit() {
    this.displayedColumns = [
      "id",
      "fullname", 
      "username",
      "code",            
      "actions"
    ];    

    this.buildForm();

    this.clientesDatasource = new ClientesDatasource(this.clientesService);

    this.clientesDatasource.loadClientes(
      5,
      "id", 
      "asc", 
      0,
      '', 
      '',
      '',
      ''
    );

    this.checkService();
  }

  ngAfterViewInit() {
    // reseteamos el paginador despues de ordenar
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);    
    // al ordenar o paginar, cargo una nueva pagina
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(      
      tap(() => this.loadClientesPage())
    )
    .subscribe();
  }

  loadClientesPage(): void {    
    let sortOrder = this.sort.direction || 'asc';
    this.clientesDatasource.loadClientes(
      this.paginator.pageSize,
      this.getSortColumn(this.sort), 
      sortOrder,
      this.paginator.pageIndex,
      this.filtersForm.value.id,
      this.filtersForm.value.code,
      this.filtersForm.value.username,
      this.filtersForm.value.fullname
    );    
  }

  onRowClicked(row: Cliente) {
    // console.log(row);
  }

  private getSortColumn(sort: MatSort): string {
    //solamente quiero ordenar por id
    switch(sort.active) {
      case "id": return "id";      
      default: return sort.active;
    };
  }

  onFilter() {
    this.paginator.pageIndex = 0;
    this.loadClientesPage();
  }

  detail(cliente: Cliente){
    //this._cliente$ = cliente;
    this.clientesService._cliente = cliente;
    this.router.navigate(['./admin/clientes/detail']);
  }

  checkService(){
    this.clientesDatasource.snackBar$.subscribe((res: any) => {
      if(res.type){
        SnackbarConfig.showSnackBar(this._snackBar, res.message);
      }
    });
  }

  openDialog(cliente: Cliente): void {
    const dialogRef = this.dialog.open(DialogQuantityComponent, {
      width: '400px',
      data: {
        cliente: cliente, 
        quantity: 0
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //preguntar si esta seguro?
      if(result){//existe un resultado
        if(result.quantity){//existe una eleccion
          console.log(result);
          this.saveRecarga(result);
        }
      }
    });
  }

  saveRecarga(data:any){
    const recarga: Partial<Recarga> = {
      quantity: data.quantity,
      player_id: data.cliente.id
    };
    this.recargaService.apiStoreRecargas(recarga)
    .subscribe((rta: any) => {
      const recharge: Recarga = rta.recharge;
      console.log(recharge);
      this.loadClientesPage();//refresco la lista      
      SnackbarConfig.showSnackBar(this._snackBar, rta.message);
      //this.router.navigate(['./admin/clientes']);//redireccionamos
    },
    error => {
      SnackbarConfig.showSnackBar(this._snackBar, error);
    });
  }

  private buildForm(){ 
    this.filtersForm = this._fb.group({
      id: [null],
      code: [null],
      username: [null],
      fullname: [null]
    });    
  }
}
