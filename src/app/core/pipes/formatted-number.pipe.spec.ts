import { NgxTranslateModule } from 'src/app/ngx-translate/ngx-translate.module';

import { TestBed } from '@angular/core/testing';

import { ParseHelper } from '../utilities/parse-helper';
import { FormattedNumberPipe } from './formatted-number.pipe';

describe('FormattedNumberPipe', () => {
  const LOCALE_JP = 'ja-JP';
  const LOCALE_EN = 'en-US';
  const LOCALE_FR = 'fr-FR';
  const LOCALE_DE = 'de-DE';

  let pipe: FormattedNumberPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxTranslateModule],
      providers: [FormattedNumberPipe]
    });
    pipe = TestBed.inject(FormattedNumberPipe);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(pipe).toBeTruthy();
    });
  });
  describe('#transform', () => {
    describe('When the value to be converted is a number, it should return transformed result', () => {
      const parameters = [
        {
          value: '1234567',
          locale: LOCALE_JP,
          expectedValue: '1,234,567'
        },
        {
          value: '1234,567',
          locale: LOCALE_JP,
          expectedValue: '1,234,567'
        },
        {
          value: '1234567',
          locale: LOCALE_EN,
          expectedValue: '1,234,567'
        },
        {
          value: '1,234567',
          locale: LOCALE_EN,
          expectedValue: '1,234,567'
        },
        {
          value: '1234567',
          locale: LOCALE_FR,
          expectedValue: '1 234 567'
        },
        {
          value: '1234567',
          locale: LOCALE_DE,
          expectedValue: '1.234.567'
        }
      ];

      parameters.forEach((parameter) => {
        it(
          'should correctly converted from ' +
            parameter.value +
            ' to ' +
            parameter.expectedValue +
            ' in locale ' +
            parameter.locale,
          () => {
            expect(pipe.transform(parameter.value, parameter.locale)).toEqual(parameter.expectedValue);
          }
        );
      });
    });

    describe('When the value to be converted is not a number, it should return non transformed result', () => {
      it('should return non transformed result when the value to be converted is Japanese', () => {
        const value = 'あいうえお';
        const locale = 'ja-JP';
        expect(pipe.transform(value, locale)).toEqual(value);
      });
    });
  });

  describe('#parse', () => {
    it('should have been called', () => {
      const value = '1,234,567';
      const locale = 'ja-JP';
      spyOn(ParseHelper, 'parse');
      pipe.parse(value, locale);
      expect(ParseHelper.parse).toHaveBeenCalledWith(value, locale);
    });
  });
});
