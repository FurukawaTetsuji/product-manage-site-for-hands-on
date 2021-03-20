import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormattedNumberPipe } from '../pipes/formatted-number.pipe';
import { FormattedNumberInputDirective } from './formatted-number-input.directive';

@Component({
  template: ` <input type="text" appFormattedNumberInput locale="ja-JP" /> `
})
class TestFormattedNumberInputComponent {}

const expectFormattedValue = '1,234,567';
const expectNotFormattedValue = '1234567';

describe('FormattedNumberInputDirective', () => {
  let component: TestFormattedNumberInputComponent;
  let fixture: ComponentFixture<TestFormattedNumberInputComponent>;
  let htmlInputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormattedNumberPipe],
      declarations: [TestFormattedNumberInputComponent, FormattedNumberInputDirective]
    });
    fixture = TestBed.createComponent(TestFormattedNumberInputComponent);
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
