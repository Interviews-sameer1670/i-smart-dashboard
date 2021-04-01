import { Component } from '@angular/core';
import { ExternalApiService } from './external-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'i-smart';
  userSelectionObject: any = {};
  pieChartLabels: any = [];
  pieChartData: any = [];
  pieChartContentSchema: any = {'Medical': 0, 'Travel': 0, 'Loans': 0, 'Utility Bills': 0, 'Education': 0, 'Shopping': 0, 'Misc.': 0};

  constructor(private externalApi: ExternalApiService) {

  }

  fetchTransactions(event) {
    // console.log('output event from view transaction ', event);
    this.userSelectionObject = event;
    let pieChartContent = JSON.parse(JSON.stringify(this.pieChartContentSchema));
    let transactionArray = this.externalApi.getTransactionData();
    transactionArray.forEach(element => {
      pieChartContent[element.Category] += parseInt(element.Amount);
    });
    this.pieChartLabels = Object.keys(pieChartContent);
    this.pieChartData = Object.values(pieChartContent);
  }
}
