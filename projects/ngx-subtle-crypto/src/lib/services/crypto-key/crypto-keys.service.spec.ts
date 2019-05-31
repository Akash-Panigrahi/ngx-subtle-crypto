import { TestBed } from '@angular/core/testing';

import { CryptoKeyService } from './crypto-key.service';

describe('CryptoKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptoKeyService = TestBed.get(CryptoKeyService);
    expect(service).toBeTruthy();
  });
});
