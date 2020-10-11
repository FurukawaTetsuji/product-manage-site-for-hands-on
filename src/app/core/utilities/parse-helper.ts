import { DecimalPipe } from '@angular/common';

import { RegexConst } from '../constants/regex-const';

export class ParseHelper {
  /**
   * Parses
   * @param value value with thousand separator
   * @param locale locale
   * @returns parsed value
   */
  static parse(value: any, locale: string): string {
    let thousandsSeparator = new DecimalPipe(locale).transform('1111', '', locale).charAt(1);
    thousandsSeparator = ParseHelper.escapePeriod(thousandsSeparator);

    return (
      value
        .toString()
        // Remove actual thousand separator
        .replace(new RegExp(thousandsSeparator, 'g'), '')
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
