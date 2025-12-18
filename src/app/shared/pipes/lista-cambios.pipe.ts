import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listaCambios'
})
export class ListaCambiosPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const newPath:string = value.replace("/liberaciones/devqa/", "");
    return newPath;
  }

}
