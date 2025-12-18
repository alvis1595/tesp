import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'crqs'
})
export class CrqsPipe implements PipeTransform {


transform(value: string, ...args: unknown[]): string | null {
    //Ajustar la expresión regular para que coincida con URLs y cadenas simples
    const regex = /REP-\d+/;
    const match = value.match(regex);

    return match ? match[0] : null;
  }
}
