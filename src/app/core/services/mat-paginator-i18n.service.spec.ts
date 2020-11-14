import { TranslateTestingModule } from 'ngx-translate-testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { MatPaginatorI18nService } from './mat-paginator-i18n.service';

describe('MatPaginatorI18nService', () => {
  const privateMethodName = 'setupLabels';
  let service: MatPaginatorI18nService;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') })]
    });
    service = TestBed.inject(MatPaginatorI18nService);
    translateService = TestBed.inject(TranslateService);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('translateService#onLangChange', () => {
    it('should catch lang change event', () => {
      spyOn<any>(service, privateMethodName).and.callThrough();
      expect(service[privateMethodName]).toHaveBeenCalledTimes(0);

      translateService.onLangChange.emit();
      expect(service[privateMethodName]).toHaveBeenCalledTimes(1);
    });
  });

  describe('#getRangeLabel', () => {
    const parameters = [
      {
        page: 0,
        pageSize: 10,
        length: 0,
        expectedValue: '0 / 0',
        no: 1
      },
      {
        page: 0,
        pageSize: 10,
        length: 1,
        expectedValue: '1 – 1 / 1',
        no: 2
      },
      {
        page: 1,
        pageSize: 10,
        length: 11,
        expectedValue: '11 – 11 / 11',
        no: 3
      },
      {
        page: 1,
        pageSize: 10,
        length: 20,
        expectedValue: '11 – 20 / 20',
        no: 4
      },
      {
        page: 2,
        pageSize: 10,
        length: 21,
        expectedValue: '21 – 21 / 21',
        no: 5
      },
      {
        page: 0,
        pageSize: 50,
        length: 1,
        expectedValue: '1 – 1 / 1',
        no: 6
      },
      {
        page: 1,
        pageSize: 50,
        length: 100,
        expectedValue: '51 – 100 / 100',
        no: 7
      },
      {
        page: 2,
        pageSize: 50,
        length: 100,
        expectedValue: '101 – 150 / 100',
        no: 8
      }
    ];

    parameters.forEach((parameter) => {
      it(
        'should be displayed correctly as ' +
          parameter.expectedValue +
          ', When the page is ' +
          parameter.page +
          ' and pageSize is ' +
          parameter.pageSize +
          ' and length is ' +
          parameter.length +
          ' (no = ' +
          parameter.no +
          ')',
        () => {
          expect(service.getRangeLabel(parameter.page, parameter.pageSize, parameter.length)).toBe(
            parameter.expectedValue
          );
        }
      );
    });
  });

  describe('#setupLabels', () => {
    it('should set Japanese on the itemsPerPageLabel', () => {
      service[privateMethodName]();
      expect(service.itemsPerPageLabel).toBe('件数：');
    });
    it('should set Japanese on the nextPageLabel', () => {
      service[privateMethodName]();
      expect(service.nextPageLabel).toBe('次ページへ');
    });
    it('should set Japanese on the previousPageLabel', () => {
      service[privateMethodName]();
      expect(service.previousPageLabel).toBe('前ページへ');
    });
  });
});
