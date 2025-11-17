import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogTemplateDemo } from './confirm-dialog-template-demo';

describe('ConfirmDialogTemplateDemo', () => {
  let component: ConfirmDialogTemplateDemo;
  let fixture: ComponentFixture<ConfirmDialogTemplateDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogTemplateDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogTemplateDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
