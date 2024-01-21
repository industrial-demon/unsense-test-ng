import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';

export type FieldIndication =
  | 'empty'
  | 'medium'
  | 'easy'
  | 'strong'
  | 'invalidLength';

import {
  lettersRegex,
  numbersRegex,
  symbolsRegex,
  lettersAndSymbolsRegex,
  lettersAndNumbersRegex,
  numbersAndSymbolsRegex,
  lettersNumbersSynbolsRegex,
} from '../shared/regex';
import { IndicatorNamePipe } from './indicator-name.pipe';

@Component({
  selector: 'ns-field-indicator',
  templateUrl: './field-indicator.component.html',
  styleUrl: './field-indicator.component.css',
  standalone: true,
  imports: [CommonModule, IndicatorNamePipe],
})
export class FieldIndicatorComponent implements OnInit, OnDestroy {
  componentDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @Input({
    required: true,
  })
  fieldControl!: AbstractControl | null;

  indicator: FieldIndication = 'empty';

  getEasyClass() {
    return {
      indicator: true,
      'bg-red-600 text-white':
        this.indicator === 'invalidLength' || this.indicator === 'easy',
      'bg-slate-300': this.indicator === 'empty',
      'bg-yellow-500': this.indicator === 'medium',
      'bg-emerald-600 text-white': this.indicator === 'strong',
    };
  }

  getMediumClass() {
    return {
      indicator: true,
      'bg-red-600 text-white': this.indicator === 'invalidLength',
      'bg-slate-300': this.indicator === 'empty' || this.indicator === 'easy',
      'bg-yellow-500': this.indicator === 'medium',
      'bg-emerald-600 text-white': this.indicator === 'strong',
    };
  }

  getStrongClass() {
    return {
      indicator: true,
      'bg-red-600 text-white': this.indicator === 'invalidLength',
      'bg-slate-300':
        this.indicator === 'empty' ||
        this.indicator === 'easy' ||
        this.indicator === 'medium',
      'bg-emerald-600 text-white': this.indicator === 'strong',
    };
  }

  ngOnInit(): void {
    this.fieldControl?.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((val: string) => {
        if (val === '') {
          this.indicator = 'empty';
        }

        if (val.length > 0 && val.length < 8) {
          this.indicator = 'invalidLength';
        }

        if (val.length >= 8) {
          if (
            lettersRegex.test(val) ||
            numbersRegex.test(val) ||
            symbolsRegex.test(val)
          ) {
            this.indicator = 'easy';
          }
          if (
            lettersAndSymbolsRegex.test(val) ||
            lettersAndNumbersRegex.test(val) ||
            numbersAndSymbolsRegex.test(val)
          ) {
            this.indicator = 'medium';
          }

          if (lettersNumbersSynbolsRegex.test(val)) {
            this.indicator = 'strong';
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
