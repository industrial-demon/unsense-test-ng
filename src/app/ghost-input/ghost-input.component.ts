import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  booleanAttribute,
} from '@angular/core';
import { GhostInputLabelDirective } from './directives/ghost-input-label.directive';
import { GhostInputPrimitiveDirective } from './directives/ghost-input.directive';
import { GhostInputRootDirective } from './directives/ghost-input-root.directive';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ghost-input',
  standalone: true,
  templateUrl: './ghost-input.component.html',
  imports: [
    FormsModule,
    CommonModule,
    GhostInputRootDirective,
    GhostInputLabelDirective,
    GhostInputPrimitiveDirective,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GhostInputComponent,
    },
  ],
})
export class GhostInputComponent
  implements ControlValueAccessor, AfterViewInit
{
  input!: string;

  onChange = (value: any) => {};
  onTouched = () => {};

  touched = false;
  disabled = false;

  @ViewChild('ghostInput')
  inputEl?: ElementRef<HTMLInputElement>;

  @Input()
  label: string = '';

  @Input()
  value: string = '';

  @Input()
  error?: string;

  @Input({ transform: booleanAttribute })
  autoFocus = false;

  @Output() onChangeValue = new EventEmitter();

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  onChangeInput(value: string) {
    this.value = value;
    this.onChange(this.value);
    this.onChangeValue.emit(this.value);
  }

  ngAfterViewInit(): void {
    if (this.autoFocus) {
      this.inputEl?.nativeElement.focus();
    }
  }
}
