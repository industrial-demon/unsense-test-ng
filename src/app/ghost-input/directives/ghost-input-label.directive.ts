import {
  computed,
  Directive,
  Input,
  signal,
} from '@angular/core';
import { cva } from 'class-variance-authority';
import { ClassValue } from 'class-variance-authority/dist/types';

const label = cva(
  [
    'text-[#585858] opacity-80',
    'whitespace-nowrap',
    'peer/control:bg-red',
    'absolute top-[calc(0.5rem+1px)] z-10 origin-[0] -translate-y-0 scale-75 transform text-body-3-r duration-300 peer-placeholder-shown/control:translate-y-0 peer-placeholder-shown/control:scale-100',
    'peer-focus/control:left-0 peer-focus/control:-translate-y-4 peer-focus/control:scale-75',
  ],
  {
    variants: {
      isValue: {
        true: '-translate-y-4 scale-75',
        false: '',
      },
    },
  }
);

@Directive({
  selector: '[ghostInputLabel]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class GhostInputLabelDirective {
  private readonly _userCls = signal<ClassValue>('');
  @Input()
  set class(userCls: ClassValue) {
    this._userCls.set(userCls);
  }

  private readonly _isValue = signal<boolean>(false);
  @Input({ required: true })
  set isValue(value: boolean) {
    this._isValue.set(value);
  }

  protected _computedClass = computed(() => this._generateClass());
  private _generateClass() {
    return label({ isValue: this._isValue(), class: this._userCls() });
  }
}
