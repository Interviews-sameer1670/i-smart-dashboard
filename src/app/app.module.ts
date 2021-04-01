import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';

import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { ExpenditureListComponent } from './expenditure-list/expenditure-list.component';
import { SpendAnalysisComponent } from './spend-analysis/spend-analysis.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterExpenditurePipe } from './pipes/filter-expenditure.pipe';
import { ExternalApiService } from './external-api.service';

@NgModule({
  declarations: [
    AppComponent,
    TransactionFormComponent,
    ViewTransactionComponent,
    ExpenditureListComponent,
    SpendAnalysisComponent,
    FilterExpenditurePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ExternalApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
