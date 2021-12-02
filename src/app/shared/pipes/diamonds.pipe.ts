import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diamonds'
})
export class DiamondsPipe implements PipeTransform {  

  transform(value: string): any {
    switch(value){
      case 's':
          return 'Tarjeta semanal';
          break;
      case 'm':
          return 'Tarjeta mensual';
          break;
      default: 
        return value + ' diamantes';
        break;
    }
  }

}
