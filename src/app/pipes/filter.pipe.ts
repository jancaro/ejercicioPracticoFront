import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any, prop: any): any {
    const resultClients = [];
    for(const client of value){
      if(client[prop].toUpperCase().indexOf(arg.toUpperCase()) > -1){
        resultClients.push(client);
      }
    }
    return resultClients;
  }

}
