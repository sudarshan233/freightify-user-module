import { TestBed } from '@angular/core/testing';

import { NgTemplates } from './ng-templates';

describe('NgTemplates', () => {
  let service: NgTemplates;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgTemplates);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
