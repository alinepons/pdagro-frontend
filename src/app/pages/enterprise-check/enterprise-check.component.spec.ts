import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseCheckComponent } from './enterprise-check.component';

describe('EnterpriseCheckComponent', () => {
  let component: EnterpriseCheckComponent;
  let fixture: ComponentFixture<EnterpriseCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
