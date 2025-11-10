import { TestBed } from '@angular/core/testing';

import { PopUp } from './pop-up';

describe('PopUp', () => {
  let service: PopUp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
