import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from '@core/models/cliente';
import { ClientesService } from '@core/services/clientes/clientes.service';
import { SnackbarConfig } from '@shared/utils/snackbar-config';

@Component({
  selector: 'app-clientes-add',
  templateUrl: './clientes-add.component.html',
  styleUrls: ['./clientes-add.component.scss']
})
export class ClientesAddComponent implements OnInit {

  formData!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private clientesService: ClientesService
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  saveCliente(event: Event){
    event.preventDefault();
    const cliente: Cliente = this.formData.value;
    this.clientesService.apiPlayerStore(cliente)
      .subscribe((rta: any) => {
        SnackbarConfig.showSnackBar(this._snackBar, rta.message)
        if(rta.type === 'success')
          this.router.navigate(['./admin/clientes']);
      },
      error => {
        console.log(error);
        SnackbarConfig.showSnackBar(this._snackBar, error);
      });
  } 

  private buildForm(){
    this.formData = this.formBuilder.group({
      fullname: ['',
        [
          Validators.required          
        ]
      ],
      username: ['',
        [
          Validators.required
        ]
      ],
      code: ['',
        [
          Validators.required
        ]
      ]
    });    
  }

  get fullnameField(){
    //return this.formData.get('fullname');
    return this.formData.controls['fullname'];
  }
  get usernameField(){
    return this.formData.controls['username'];
  }
  get codeField(){
    return this.formData.controls['code'];
  }

}
