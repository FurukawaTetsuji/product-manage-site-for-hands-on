import { TestBed } from '@angular/core/testing';

import { MatPaginatorI18nService } from './mat-paginator-i18n.service';

describe('MatPaginatorI18nService', () => {
  let service: MatPaginatorI18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatPaginatorI18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
