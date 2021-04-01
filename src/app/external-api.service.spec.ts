import { TestBed } from '@angular/core/testing';

import { ExternalApiService } from './external-api.service';

describe('ExternalApiService', () => {
  let service: ExternalApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalApiService);
    service = new ExternalApiService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should return all transactions', () => {
    service.allTransactionsArray = [{
        TransactionId: 'Tx001',
        Description: 'Medical',
        Category: 'Misc',
        Amount: '800.00',
        Type: 'D',
        TransactionDate: '',
        MonthYear: 'March 2021'
    },
    {
        TransactionId: 'Tx001',
        Description: 'Personal',
        Category: 'Misc',
        Amount: '800.00',
        Type: 'D',
        TransactionDate: '',
        MonthYear: 'March 2021'
    },
    {
        TransactionId: 'Tx001',
        Description: 'Personal',
        Category: 'Misc',
        Amount: '800.00',
        Type: 'D',
        TransactionDate: '',
        MonthYear: 'February 2021'
    }];
    let output = service.allTransactionsArray;
    expect(service.getTransactionData()).toEqual(output)

  });

  fit('should save transaction', () => {
    let data = {
      TransactionId: 'Tx001',
      Description: 'Medical',
      Category: 'Misc',
      Amount: '800.00',
      Type: 'D',
      TransactionDate: '2021-04-01',
      MonthYear: 'March 2021'
    };
    expect(service.saveTransaction(data)).toBe(200);
  });

  fit('debit and credit account balance', () => {
    service.initialAccountBalance = 100.00;
    expect(service.debitAccountBalance(10)).toBe(90.00);
    expect(service.creditAccountBalance(10.00)).toBe(100.00);
  })

});
