import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '@core/models/cliente';
import { Recarga } from '@core/models/recarga';
import { MyValidators } from '@shared/utils/validators';

@Component({
  selector: 'app-dialog-cip',
  templateUrl: './dialog-cip.component.html',
  styleUrls: ['./dialog-cip.component.scss']
})
export class DialogCipComponent {

  form !: FormGroup;
  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogCipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      cliente: Cliente,
      recarga: Recarga
  }) {
    //las variables de data son las mismas que se envian desde el componente que va abrir este modal
    //sin embargo en la vista de este modal puedo retornar otra variable, como en este caso el form
    this.buildForm();
  }
  
  onNoClick(): void {    
    this.dialogRef.close();
  }

  private buildForm(){ 
    console.log(this.data.recarga.id);
    //asigno el id que me envian desde el componente a mi campo del form en el id de recarga
    this.form = this._fb.group({
      id: [this.data.recarga.id, [
        Validators.required
      ]],
      cip: ['', [
        Validators.required,
        MyValidators.isCipValid
      ]]      
    });
  }
}
