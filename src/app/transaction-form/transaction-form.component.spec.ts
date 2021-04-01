import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ExternalApiService } from '../external-api.service';

import { TransactionFormComponent } from './transaction-form.component';

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;
  let service: ExternalApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionFormComponent],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      providers: [ExternalApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // service provided to test-bed
    service = TestBed.inject(ExternalApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('form invalid when empty', () => {
    // spyOn(service, 'amountObservable').and.returnValue(true);
    expect(component.makeAndReceivePaymentsForm.valid).toBeFalsy();
  });

  fit('amount field validation', () => {
    let amount = component.makeAndReceivePaymentsForm.controls['amount'];
    expect(amount.valid).toBeFalsy();
    
    let errors = {};
    amount.setValue("");
    errors = amount.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  fit('description field validation', () => {
    let description = component.makeAndReceivePaymentsForm.controls['amount'];
    expect(description.valid).toBeFalsy();
    
    let errors = {};
    description.setValue("This string will have more than twenty characters.");
    errors = description.errors || {};
    expect(errors['maxLength']).toBeFalsy();
  });

  fit('error when payment amount is greater than account balance', () => {
    component.accountBalance = 1000;
    let amount = component.makeAndReceivePaymentsForm.controls['amount'];
    amount.setValue(100);
    let paymentType = component.makeAndReceivePaymentsForm.controls['paymentType'];
    paymentType.setValue('Make Payment');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.alert-danger'))).toBeNull();
  });
  
});
