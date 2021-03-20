import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormattedCurrencyPipe } from '../pipes/formatted-currency.pipe';
import { FormattedCurrencyInputDirective } from './formatted-currency-input.directive';

@Component({
  template: ` <input type="text" appFormattedCurrencyInput locale="en-US" currency="USD" /> `
})
class TestFormattedCurrencyInputComponent {}

const expectFormattedValue = '1,234,567.89';
const expectNotFormattedValue = '1234567.89';

describe('FormattedCurrencyInputDirective', () => {
  let component: TestFormattedCurrencyInputComponent;
  let fixture: ComponentFixture<TestFormattedCurrencyInputComponent>;
  let htmlInputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormattedCurrencyPipe],
      declarations: [TestFormattedCurrencyInputComponent, FormattedCurrencyInputDirective]
    });
    fixture = TestBed.createComponent(TestFormattedCurrencyInputComponent);
    component = fixture.componentInstance;
    htmlInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#onFocus', () => {
    it('should parse', () => {
      htmlInputElement.value = expectFormattedValue;
      htmlInputElement.dispatchEvent(new Event('focus', {}));
      fixture.detectChanges();

      expect(htmlInputElement.value).toBe(expectNotFormattedValue);
    });
  });

  describe('#onBlur', () => {
    it('should transfer', () => {
      htmlInputElement.value = expectNotFormattedValue;
      htmlInputElement.dispatchEvent(new Event('blur', {}));
      fixture.detectChanges();

      expect(htmlInputElement.value).toBe(expectFormattedValue);
    });
  });

  describe('#beforePaste', () => {
    it('should transfer', () => {
      htmlInputElement.value = expectFormattedValue;
      htmlInputElement.dispatchEvent(new ClipboardEvent('paste', {}));
      fixture.detectChanges();

      expect(htmlInputElement.value).toBe(expectNotFormattedValue);
    });
  });

  describe('#onKeyUp', () => {
    it('should transfer', () => {
      htmlInputElement.value = expectFormattedValue;
      htmlInputElement.dispatchEvent(new Event('keyup', {}));
      fixture.detectChanges();

      expect(htmlInputElement.value).toBe(expectNotFormattedValue);
    });
  });
});
