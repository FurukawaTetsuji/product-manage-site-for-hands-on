import { TestBed } from '@angular/core/testing';

import { SuccessMessagingService } from './success-messaging.service';

describe('SuccessMessagingService', () => {
  let service: SuccessMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccessMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
