import { TestBed } from '@angular/core/testing';

import { SessionStrageService } from './session-strage.service';

describe('SessionStrageService', () => {
  let service: SessionStrageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStrageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
