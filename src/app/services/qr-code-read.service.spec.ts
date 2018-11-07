import { TestBed, inject } from '@angular/core/testing';

import { QrCodeReadService } from './qr-code-read.service';

describe('QrCodeReadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QrCodeReadService]
    });
  });

  it('should be created', inject([QrCodeReadService], (service: QrCodeReadService) => {
    expect(service).toBeTruthy();
  }));
});
