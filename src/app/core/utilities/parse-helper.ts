import { CurrencyPipe, DecimalPipe } from '@angular/common';

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
    const HalfWidthBlank = ' ';
    const escapedActualThousandSeparator = ParseHelper.escapePeriod(actualThousandsSeparator);

    return (
      value
        .toString()
        // First converts with half-width blank
        .replace(new RegExp(HalfWidthBlank, 'g'), '')
        // Converts with actual thousand separator regex
        .replace(new RegExp(escapedActualThousandSeparator, 'g'), '')
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
