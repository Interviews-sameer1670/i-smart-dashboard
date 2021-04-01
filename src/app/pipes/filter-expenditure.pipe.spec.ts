import { FilterExpenditurePipe } from './filter-expenditure.pipe';

describe('FilterExpenditurePipe', () => {
  let pipe: FilterExpenditurePipe;

  beforeEach(() => {
    pipe = new FilterExpenditurePipe();
  });

  it('create an instance', () => {
    const pipe = new FilterExpenditurePipe();
    expect(pipe).toBeTruthy();
  });

  fit('when user selects All', () => {
    let input = [{
      TransactionId: 'Tx001',
      Description: 'Medical',
      Category: 'Misc',
      Amount: '800.00',
      Type: 'D',
      TransactionDate: '',
      MonthYear: 'March 2021'
    }];

    let userSelection = { category: 'All', month: 'March 2021' }
    let output = input;

    expect(pipe.transform(input, userSelection)).toEqual(output);
  });

  fit('when user selects other than All', () => {
    let input = [{
      TransactionId: 'Tx001',
      Description: 'Medical',
      Category: 'Misc',
      Amount: '800.00',
      Type: 'D',
      TransactionDate: '',
      MonthYear: 'March 2021'
    }];

    let userSelection = { category: '', month: 'March 2021' }
    let output = [];

    expect(pipe.transform(input, userSelection)).toEqual(output);
  });
});
