export class RegexConst {
  static readonly HalfWidthBlank = ' ';
  static readonly HalfWidthComma = ',';
  static readonly HalfWidthPeriod = '.';

  static readonly SINGLE_BYTE_ALPHANUMERIC = '^[0-9a-zA-Z]+$';
  static readonly SINGLE_BYTE_NUMERIC_COMMA_PERIOD_SPACE = '^[0-9,. ]+$';
}
