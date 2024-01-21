import { computed, Directive, Input, signal } from '@angular/core';
import { cva } from 'class-variance-authority';
import { ClassValue } from 'class-variance-authority/dist/types';

export const root = cva('relative z-0 bg-white');

@Directive({
  selector: '[ghostInputRoot]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class GhostInputRootDirective {
  private readonly _userCls = signal<ClassValue>('');
  @Input()
  set class(userCls: ClassValue) {
    this._userCls.set(userCls);
  }
  protected _computedClass = computed(() => this._generateClass());
  private _generateClass() {
    return root({ class: this._userCls() });
  }
}
