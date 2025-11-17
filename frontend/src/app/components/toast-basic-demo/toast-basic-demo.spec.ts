import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastBasicDemo } from './toast-basic-demo';

describe('ToastBasicDemo', () => {
  let component: ToastBasicDemo;
  let fixture: ComponentFixture<ToastBasicDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastBasicDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastBasicDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
