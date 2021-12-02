import { MatSnackBar } from "@angular/material/snack-bar";
export class SnackbarConfig {  
  static showSnackBar(_snackBar: MatSnackBar, message: string) {
    //mensaje, boton de accion, {configuracion}    
      _snackBar.open(message, '',
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      );
    }
}