import { TestBed } from '@angular/core/testing';

import { NgxSubtleCryptoService } from './ngx-subtle-crypto.service';

describe('NgxSubtleCryptoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxSubtleCryptoService = TestBed.get(NgxSubtleCryptoService);
    expect(service).toBeTruthy();
  });
});
