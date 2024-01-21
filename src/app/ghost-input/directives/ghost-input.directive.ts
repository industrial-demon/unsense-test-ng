import { computed, Directive, Input, signal } from '@angular/core';
import { cva } from 'class-variance-authority';
import { ClassValue } from 'class-variance-authority/dist/types';

const inputCss = cva(
  [
    'peer/control block w-full appearance-none border-0 border-b bg-transparent px-0 pt-3 pb-1 text-body-3-r focus:outline-none focus:ring-0',
    'text-[#2D3436]',
    'focus:border-b-green-600 focus:border-b',
  ],
  {
    variants: {
      invalid: {
        true: 'border-red-300 hover:border-red-400',
        false: 'focus:grey-100 border-b-green hover:border-x-green',
      },
    },
  }
);

@Directive({
  selector: '[ghostInput]',
  exportAs: '[inputPrimitive]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class GhostInputPrimitiveDirective {
  private readonly _userCls = signal<ClassValue>('');
  @Input()
  set class(userCls: ClassValue) {
    this._userCls.set(userCls);
  }
  protected _computedClass = computed(() => this._generateClass());
  private _generateClass() {
    return inputCss({ class: this._userCls() });
  }
}
