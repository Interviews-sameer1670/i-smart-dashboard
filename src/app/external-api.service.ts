import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {

  // mockApiEndpoint = "https://606472e6f091970017785b94.mockapi.io/i-smart/api/getTransactions";
  allTransactionsArray: any = [];
  initialAccountBalance: any = 10000.00;
  amountObservable = new BehaviorSubject(this.initialAccountBalance);

  constructor(private http: HttpClient) { }

  /* getAccountBalance() {
    return this.amountObservable.next(this.initialAccountBalance);
    // return this.initialAccountBalance;
  } */

  debitAccountBalance(debitAmt) {
    this.initialAccountBalance = this.initialAccountBalance - parseInt(debitAmt);
    this.amountObservable.next(this.initialAccountBalance);
  }

  creditAccountBalance(creditAmt) {
    this.initialAccountBalance += parseInt(creditAmt);
    this.amountObservable.next(this.initialAccountBalance);
  }

  saveTransaction(data) {
    this.allTransactionsArray.push(data);
    if (data.Type.includes('Make')) {
      this.debitAccountBalance(data.Amount);
    } else {
      this.creditAccountBalance(data.Amount);
    }
    console.log('Account Balance ', this.initialAccountBalance);
    console.log('All transaction Array ', this.allTransactionsArray);
    return 200;
  }

  getTransactionData() {
    return this.allTransactionsArray;
  }
}
