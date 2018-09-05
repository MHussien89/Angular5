import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateplanAdminComponent } from './rateplan-admin.component';

describe('RateplanAdminComponent', () => {
  let component: RateplanAdminComponent;
  let fixture: ComponentFixture<RateplanAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateplanAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateplanAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
