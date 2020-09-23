import { FormattedCurrencyPipe } from './formatted-currency.pipe';

describe('FormattedCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new FormattedCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
