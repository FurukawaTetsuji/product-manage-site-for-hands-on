import { NgxTranslateModule } from 'src/app/ngx-translate/ngx-translate.module';

import { TestBed } from '@angular/core/testing';

import { ParseHelper } from './parse-helper';

describe('ParseHelper', () => {
  const LOCALE_JP = 'ja-JP';
  const LOCALE_EN = 'en-US';
  const LOCALE_FR = 'fr-FR';
  const LOCALE_DE = 'de-DE';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxTranslateModule]
    });
  });

  describe('#parse', () => {
    describe('When the value is number', () => {
      const parameters = [
        {
          locale: LOCALE_JP,
          value: '1,234,567',
          expectedValue: '1234567'
        },
        {
          locale: LOCALE_EN,
          value: '1,234,567',
          expectedValue: '1234567'
        },
        {
          locale: LOCALE_FR,
          value: '1 234 567',
          expectedValue: '1234567'
        },
        {
          locale: LOCALE_DE,
          value: '1.234.567',
          expectedValue: '1234567'
        }
      ];

      parameters.forEach((parameter) => {
        it('should correctly converted in locale ' + parameter.locale, () => {
          expect(ParseHelper.parse(parameter.value, parameter.locale)).toEqual(parameter.expectedValue);
        });
      });
    });

    describe('When the value is currency', () => {
      const parameters = [
        {
          locale: LOCALE_JP,
          value: '1,234,567',
          expectedValue: '1234567'
        },
        {
          locale: LOCALE_EN,
          value: '1,234,567.89',
          expectedValue: '1234567.89'
        },
        {
          locale: LOCALE_FR,
          value: '1 234 567,89',
          expectedValue: '1234567.89'
        },
        {
          locale: LOCALE_DE,
          value: '1.234.567,89',
          expectedValue: '1234567.89'
        }
      ];

      parameters.forEach((parameter) => {
        it('should correctly converted in locale ' + parameter.locale, () => {
          expect(ParseHelper.parse(parameter.value, parameter.locale)).toEqual(parameter.expectedValue);
        });
      });
    });
  });
});
