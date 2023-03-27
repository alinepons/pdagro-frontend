import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompanyComponent } from './modal-company.component';

describe('ModalCompanyComponent', () => {
  let component: ModalCompanyComponent;
  let fixture: ComponentFixture<ModalCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
