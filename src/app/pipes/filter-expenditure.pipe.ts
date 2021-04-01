import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterExpenditure'
})
export class FilterExpenditurePipe implements PipeTransform {

  transform(transactionArray: any[], userSelection: any): any {

    if (userSelection.category !== 'All') {
      return transactionArray.filter(v => v.MonthYear == userSelection.month && v.Category == userSelection.category);
    }
    return transactionArray.filter(v => v.MonthYear == userSelection.month);
  }

}
