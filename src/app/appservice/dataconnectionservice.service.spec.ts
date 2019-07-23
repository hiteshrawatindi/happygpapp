import { TestBed } from '@angular/core/testing';

import { DataconnectionserviceService } from './dataconnectionservice.service';

describe('DataconnectionserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataconnectionserviceService = TestBed.get(DataconnectionserviceService);
    expect(service).toBeTruthy();
  });
});
