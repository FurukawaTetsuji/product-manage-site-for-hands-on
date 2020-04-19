import { TestBed } from '@angular/core/testing';

import { TitleI18Service } from './title-i18.service';

describe('TitleI18Service', () => {
  let service: TitleI18Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleI18Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
