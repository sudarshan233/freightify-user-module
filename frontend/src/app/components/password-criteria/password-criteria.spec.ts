import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCriteria } from './password-criteria';

describe('PasswordCriteria', () => {
  let component: PasswordCriteria;
  let fixture: ComponentFixture<PasswordCriteria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordCriteria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordCriteria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
