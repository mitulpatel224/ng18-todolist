import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appTrim]',
  standalone: true,
})
export class TrimDirective {
  /** Instance: Native element control */
  inputEl = inject(ElementRef).nativeElement as HTMLInputElement;

  /**
   * Host listener on Blur event
   */
  @HostListener('blur') onBlur() {
    this.trimValue();
  }

  /**
   * Removes white space from start and end of the given control-value
   */
  private trimValue() {
    this.inputEl.value = this.inputEl.value.trim();
    this.inputEl.dispatchEvent(new Event('input'));
  }
}
