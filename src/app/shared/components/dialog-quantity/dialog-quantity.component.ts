import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '@core/models/cliente';

@Component({
  selector: 'app-dialog-quantity',
  templateUrl: './dialog-quantity.component.html',
  styleUrls: ['./dialog-quantity.component.scss']
})
export class DialogQuantityComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogQuantityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      cliente: Cliente,
      quantity: string
  }) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
