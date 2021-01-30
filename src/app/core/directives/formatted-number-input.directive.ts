import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

import { FormattedNumberPipe } from '../pipes/formatted-number.pipe';

const LOCALE = 'locale';

@Directive({
  selector: '[appFormattedNumberInput]'
})
export class FormattedNumberInputDirective implements OnInit {
  private element: HTMLInputElement;

  constructor(private elementRef: ElementRef, private formattedNumberPipe: FormattedNumberPipe) {}

  /**
   * on init
   */
  ngOnInit(): void {
    this.element = this.elementRef.nativeElement;
    const editedValue = this.formattedNumberPipe.transform(this.element.value, this.element.getAttribute(LOCALE));
    this.element.value = editedValue;
  }

  /**
   * on forcus
   * @param value element's value
   */
  @HostListener('focus', ['$event.target.value'])
  onFocus(value: any): void {
    const editedValue = this.formattedNumberPipe.parse(value, this.element.getAttribute(LOCALE));
    this.element.value = editedValue;
  }

  /**
   * on blur
   * @param value element's value
   */
  @HostListener('blur', ['$event.target.value'])
  onBlur(value: any): void {
    const editedValue = this.formattedNumberPipe.transform(value, this.element.getAttribute(LOCALE));
    this.element.value = editedValue;
  }

  /**
   * before paste
   */
  @HostListener('paste')
  beforePaste(): void {
    this.element.dispatchEvent(new Event('keyup'));
  }

  /**
   * on key up
   * @param value element's value
   */
  @HostListener('keyup', ['$event.target.value'])
  onKeyUp(value: any): void {
    const editedValue = this.formattedNumberPipe.parse(value, this.element.getAttribute(LOCALE));
    this.element.value = editedValue;
  }
}
