import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spend-analysis',
  templateUrl: './spend-analysis.component.html',
  styleUrls: ['./spend-analysis.component.scss']
})
export class SpendAnalysisComponent implements OnInit {

  @Input() userSelection: any;
  @Input() pieChartLabels: any = [];
  @Input() pieChartData: any = [];
  pieChartColors: any = ['#79c43d', '#db407e', '#2ada84', '#d1a773', '#514e37', '#16d095', '#7b64d1'];
  chartType = 'pie';
  dataObj = {};

  constructor() {
  }

  ngOnInit(): void {
    // console.log('user selection in spend analysis :', this.userSelection);
  }
  
  ngOnChanges() {
    // console.log('user selection in spend analysis :', this.userSelection);
  }

}
