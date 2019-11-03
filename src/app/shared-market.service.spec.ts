import { TestBed } from '@angular/core/testing';

import { SharedMarketService } from './shared-market.service';

describe('SharedMarketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedMarketService = TestBed.get(SharedMarketService);
    expect(service).toBeTruthy();
  });
});
