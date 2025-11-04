import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingInput } from './typing-input';

describe('TypingInput', () => {
  let component: TypingInput;
  let fixture: ComponentFixture<TypingInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypingInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypingInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
