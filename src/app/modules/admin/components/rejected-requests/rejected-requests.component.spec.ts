import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedRequestsComponent } from './rejected-requests.component';

describe('RejectedRequestsComponent', () => {
  let component: RejectedRequestsComponent;
  let fixture: ComponentFixture<RejectedRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
