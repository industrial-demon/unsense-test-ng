import { Pipe, PipeTransform } from '@angular/core';
import { FieldIndication } from './field-indicator.component';

@Pipe({
  standalone: true,
  name: 'indicatorName',
})
export class IndicatorNamePipe implements PipeTransform {
  transform(value: FieldIndication) {
    let name;
    switch (value) {
      case 'easy':
        name = 'Low';
        break;
      case 'medium':
        name = 'Medium';
        break;
      case 'strong':
        name = 'Strength';
        break;
      case 'invalidLength':
        name = 'Incorrect Lenght';
        break;
      default:
        name = 'Empty';
    }
    return name;
  }
}
