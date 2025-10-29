import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputButtons } from './input-buttons';

describe('InputButtons', () => {
  let component: InputButtons;
  let fixture: ComponentFixture<InputButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputButtons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
