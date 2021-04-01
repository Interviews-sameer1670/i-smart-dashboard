import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExternalApiService } from '../external-api.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss']
})
export class ViewTransactionComponent implements OnInit {

  @Output() formValuesOut = new EventEmitter<any>();

  paymentCategory = ['', 'All', 'Medical', 'Travel', 'Loans', 'Utility Bills', 'Education', 'Shopping', 'Misc.'];
  allMonths =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  today = new Date();
  last6Months: any = [''];
  disableMonthSelection = true;
  viewTransactionForm = new FormGroup({
    frequency: new FormControl(null, [Validators.required]),
    month: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
    this.getLastSixMonths();
    this.viewTransactionForm.valueChanges.subscribe((d) => {
      // console.log('form updated :', d);
      if (this.viewTransactionForm.valid) {
        this.formValuesOut.emit(d);
      }
    });
  }
  
  getLastSixMonths() {
    for(let i = 5; i >= 0; i -= 1) {
      let d = new Date(this.today.getFullYear(), this.today.getMonth() - i, 1);
      this.last6Months.push(this.allMonths[d.getMonth()] + ' ' + d.getFullYear());
    }
    console.log('last 6 months: ', this.last6Months);
  }

  setMonthValue() {
    if (this.viewTransactionForm.get('frequency').value == 'Current') {
      this.viewTransactionForm.patchValue({month: this.allMonths[this.today.getMonth()] + ' ' + this.today.getFullYear()});
      this.disableMonthSelection = true;
    } else {
      this.viewTransactionForm.patchValue({month: null});
      this.disableMonthSelection = false;
    }
  }

}
