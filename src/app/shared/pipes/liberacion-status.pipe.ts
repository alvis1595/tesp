import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'liberacionStatus'
})
export class LiberacionStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value){
      return "- Reeliberar"
    }else {
      return ""
    }
  }

}
