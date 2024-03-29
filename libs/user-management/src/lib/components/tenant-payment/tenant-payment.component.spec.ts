import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantPaymentComponent } from './tenant-payment.component';

describe('TenantPaymentComponent', () => {
  let component: TenantPaymentComponent;
  let fixture: ComponentFixture<TenantPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TenantPaymentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
