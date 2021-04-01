import { Component, Input, OnInit } from '@angular/core';
import { ExternalApiService } from '../external-api.service';

@Component({
  selector: 'app-expenditure-list',
  templateUrl: './expenditure-list.component.html',
  styleUrls: ['./expenditure-list.component.scss']
})
export class ExpenditureListComponent implements OnInit {

  @Input() userSelection: any;

  tableHeaders = ['TxnId', 'Desc', 'Category', 'Amount', 'D/C'];
  transactionList = []

  constructor(private externalApi: ExternalApiService) { }

  ngOnInit(): void {
    // console.log('user selection in expenditure :', this.userSelection);
    this.transactionList = this.externalApi.getTransactionData();
  }

  ngOnChanges() {
    console.log('user selection in expenditure :', this.userSelection);
  }

}
