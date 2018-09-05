import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomePaymentComponent } from './welcome-payment.component';

describe('WelcomePaymentComponent', () => {
  let component: WelcomePaymentComponent;
  let fixture: ComponentFixture<WelcomePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
