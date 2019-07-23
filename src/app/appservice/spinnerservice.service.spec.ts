import { TestBed } from '@angular/core/testing';

import { SpinnerserviceService } from './spinnerservice.service';

describe('SpinnerserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpinnerserviceService = TestBed.get(SpinnerserviceService);
    expect(service).toBeTruthy();
  });
});
