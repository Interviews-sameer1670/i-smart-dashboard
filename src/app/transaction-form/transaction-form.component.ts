import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExternalApiService } from '../external-api.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  accountBalance: any;
  paymentCategory = ['Medical', 'Travel', 'Loans', 'Utility Bills', 'Education', 'Shopping', 'Misc.']
  makeAndReceivePaymentsForm = new FormGroup({
    amount: new FormControl(null, [Validators.required]),
    transactionDate: new FormControl(null, [Validators.required]),
    paymentType: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(20)])
  });
  disableSubmit = true;

  constructor(private externalApi: ExternalApiService) { }

  ngOnInit(): void {
    this.externalApi.amountObservable.subscribe(d => {
      this.accountBalance = d;
    });

    this.makeAndReceivePaymentsForm.valueChanges.subscribe(d => {
      if (this.makeAndReceivePaymentsForm.valid) {
        this.disableSubmit = false;
      } else {
        this.disableSubmit = true;
      }
    });
  }

  setAmountFormat() {
    let amount = this.makeAndReceivePaymentsForm.get('amount').value;
    this.makeAndReceivePaymentsForm.patchValue({amount: parseFloat(amount).toFixed(2)});
  }

  submitTransaction(){
    const dataToSend = {
        TransactionId: 'Tx' + Math.floor(1000 + Math.random() * 9000),
        Description: this.makeAndReceivePaymentsForm.get('description').value,
        Category: this.makeAndReceivePaymentsForm.get('category').value,
        Amount: this.makeAndReceivePaymentsForm.get('amount').value,
        Type: this.getTransactionType(),
        TransactionDate: this.makeAndReceivePaymentsForm.get('transactionDate').value,
        MonthYear: this.generateMonthYear()
    };
    let response = this.externalApi.saveTransaction(dataToSend);
    if (response == 200) {
      alert('Transaction entered successfully!');
      this.makeAndReceivePaymentsForm.reset();
    } else {
      alert('Transaction insertion failed!');
    }
  }

  getTransactionType() {
    const transactionType = this.makeAndReceivePaymentsForm.get('paymentType').value;
    if (transactionType.includes('Make')) {
      return 'D';
    } 
    return 'C';
  }

  generateMonthYear() {
    const month = new Date(this.makeAndReceivePaymentsForm.get('transactionDate').value).toLocaleString('default', {month: 'long'});
    const year = new Date(this.makeAndReceivePaymentsForm.get('transactionDate').value).getFullYear();
    return month + ' ' + year;
  }
}
