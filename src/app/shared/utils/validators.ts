import { AbstractControl } from "@angular/forms";

export class MyValidators {
  
  static isCipValid(control: AbstractControl){
    const value = control.value;
    if(value.length > 15){//15 es el numero de caracteres de un cip
      return {
        cipInvalid: true
      };
    }//sino no habra nada osea sera null
    return null;//quiere decir no hubo errores ni nada todo valido.
  }
}