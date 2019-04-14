import { TestBed } from '@angular/core/testing';

import { SubtleCryptoService } from './subtle-crypto.service';

describe('SubtleCryptoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubtleCryptoService = TestBed.get(SubtleCryptoService);
    expect(service).toBeTruthy();
  });
});
