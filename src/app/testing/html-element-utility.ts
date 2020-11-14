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

  /**
   * Sets value to html select element
   * @template T type of target component
   * @param fixture target fixture
   * @param querySelector css selector string
   * @param selectIndex index no to set element
   */
  static setValueToHtmlSelectElement<T>(fixture: ComponentFixture<T>, querySelector: string, selectIndex: number) {
    const optionSelector = '.mat-option';
    const htmlSelectElement: HTMLSelectElement = fixture.debugElement.query(By.css(querySelector)).nativeElement;
    htmlSelectElement.click();
    htmlSelectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const selectOptions = fixture.debugElement.queryAll(By.css(optionSelector));
    selectOptions[selectIndex].nativeElement.click();
    fixture.detectChanges();
  }

  /**
   * Clicks html element
   * @template T type of target component
   * @param fixture target fixture
   * @param querySelector css selector string
   */
  static clickHtmlElement<T>(fixture: ComponentFixture<T>, querySelector: string) {
    const htmlElement: HTMLElement = fixture.debugElement.query(By.css(querySelector)).nativeElement;
    // Clicks checkbox's label
    htmlElement.click();
    fixture.detectChanges();
  }
}
