import { CurrencyPipe, DecimalPipe } from '@angular/common';

import { RegexConst } from '../constants/regex-const';

export class ParseHelper {
  /**
   * Parses number
   * @param value value with thousand separator and decimal point
   * @param locale locale
   * @returns parsed number value
   */
  static parseNumber(value: any, locale: string): string {
    const actualThousandsSeparator = new DecimalPipe(locale).transform('1111', '', locale).charAt(1);

    return ParseHelper.parse(actualThousandsSeparator, value);
  }

  /**
   * Parses currency to number
   * @param value value with thousand separator and decimal point
   * @param locale locale
   * @param currency currency
   * @returns parsed number value
   */
  static parseCurrencyToNumber(value: any, locale: string, currency: string): string {
    const actualThousandsSeparator = new CurrencyPipe(locale).transform('1111', currency, '', '', locale).charAt(1);

    return ParseHelper.parse(actualThousandsSeparator, value);
  }

  private static parse(actualThousandsSeparator: string, value: any): string {
    const escapedActualThousandSeparator = ParseHelper.escapePeriod(actualThousandsSeparator);

    return (
      value
        .toString()
        // First remove half-width blank
        .replace(new RegExp(RegexConst.HalfWidthBlank, 'g'), '')
        // Remove actual thousand separator
        .replace(new RegExp(escapedActualThousandSeparator, 'g'), '')
        // Changes to a period if the decimal point is a comma
        .replace(new RegExp(RegexConst.HalfWidthComma, 'g'), RegexConst.HalfWidthPeriod)
    );
  }

  private static escapePeriod(thousandSeparator: string): string {
    if (thousandSeparator === '.') {
      // Escapes if thousand separator is Period
      return '\\' + thousandSeparator;
    }
    return thousandSeparator;
  }
}
