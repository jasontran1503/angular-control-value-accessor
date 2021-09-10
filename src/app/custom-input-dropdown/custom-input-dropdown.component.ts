import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input-dropdown',
  templateUrl: './custom-input-dropdown.component.html',
  styleUrls: ['./custom-input-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputDropdownComponent),
      multi: true,
    },
  ],
})
export class CustomInputDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placehoder!: string;
  @Input() listItem!: any[];
  @Input() isRequired!: boolean;
  @Input() textRequired!: string;
  @Input() isDisabled!: boolean;

  @ViewChild('inputSpace') inputSpace!: ElementRef;
  @ViewChild('element', { static: false }) element!: ElementRef;

  isDisplayList = false;
  value = '';
  onChange!: (value?: any) => void;
  onTouch!: (event: any) => void;

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisableState(status: boolean) {
    this.isDisabled = status;
  }

  onTouched(event: any) {
    if (this.onTouch) {
      this.onTouch(event);
    }
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  chooseItem(item: { id: number; name: string }) {
    this.isDisplayList = false;
    this.value = item.name;
    this.onChange(this.value);
  }

  onFocus() {
    this.inputSpace.nativeElement.focus();
    this.isDisplayList = true;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutSide(target: ElementRef): void {
    if (this.element?.nativeElement.contains(target)) {
      return;
    }
    this.isDisplayList = false;
  }
}
