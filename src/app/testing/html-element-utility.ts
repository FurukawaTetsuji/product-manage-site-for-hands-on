import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class HtmlElementUtility {
  /**
   * Sets value to htmlinput element
   * @template T type of target component
   * @param fixture target fixture
   * @param querySelector css selector string
   * @param setValue value to set element
   */
  static setValueToHTMLInputElement<T>(fixture: ComponentFixture<T>, querySelector: string, setValue: any) {
    const htmlInputElement: HTMLInputElement = fixture.debugElement.query(By.css(querySelector)).nativeElement;
    htmlInputElement.value = setValue;
    htmlInputElement.dispatchEvent(new Event('input'));
    htmlInputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  }
}
