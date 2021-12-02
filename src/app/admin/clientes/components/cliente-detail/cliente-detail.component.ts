import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from '@core/models/cliente';
import { Recarga } from '@core/models/recarga';
import { ClientesService } from '@core/services/clientes/clientes.service';
import { RecargasService } from '@core/services/recargas/recargas.service';
import { SnackbarConfig } from '@shared/utils/snackbar-config';
import { finalize } from 'rxjs/operators';
import { DialogCipComponent } from '../../../../shared/components/dialog-cip/dialog-cip.component';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.scss']
})
export class ClienteDetailComponent implements OnInit {

  cliente!: Cliente;
  dataSource!: Recarga[];
  displayedColumns: string[] = ['quantity', 'amount', 'cip', 'status' , 'updated_at', 'actions'];  
  animal!: string;
  name!: string;
  loadingRecharges: boolean = false;
  
  constructor(
    private router: Router,
    private clientesService: ClientesService,
    private recargasService: RecargasService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cliente = this.clientesService._cliente;
    if(!this.cliente){
      this.router.navigate(['/admin/clientes']);      
    }else{
      this.dataSource = this.cliente.recharges;
    }
  }

  //loader luego de finalizar correctramente
  
  openDialog(recarga: Recarga): void {
    const dialogRef = this.dialog.open(DialogCipComponent, {
      width: '400px',
      data: {
        cliente: this.cliente, 
        recarga: recarga
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('despues de cerrar: ', result);
      //preguntar si esta seguro?
      if(result){//existe un resultado
        //console.log(result.value.cip)
        this.saveRecarga(result.value);        
      }else{
        console.log('ha cancelado');
      }
    });
  }

  saveRecarga(recarga:Partial<Recarga>){    
    this.loadingRecharges = true;    
    this.recargasService.apiFinalizarRecarga(recarga)
    .pipe(
      finalize(() => {
        this.loadingRecharges = false;        
      })
    )
    .subscribe((rta: any) => {
      const recharge: Recarga = rta.recharge;
      //aqui busco en el array, iterando un item y obteniendo su index
      this.cliente.recharges.find((item, index) => {
        if(item.id === recharge.id){//al encontrar al item que coincide con la recarga que finalice
          this.cliente.recharges[index] = recharge;//actualizo el cliente con la nueva info de la recarga
        }
      });
      //refresco la lista
      //this.cliente.recharges = [...this.cliente.recharges];
      SnackbarConfig.showSnackBar(this._snackBar, rta.message);
    },
    error => {
      SnackbarConfig.showSnackBar(this._snackBar, error);
    });
  }  
}
