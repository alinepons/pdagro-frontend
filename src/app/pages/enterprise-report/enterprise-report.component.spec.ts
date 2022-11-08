import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseReportComponent } from './enterprise-report.component';

describe('EnterpriseReportComponent', () => {
  let component: EnterpriseReportComponent;
  let fixture: ComponentFixture<EnterpriseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
