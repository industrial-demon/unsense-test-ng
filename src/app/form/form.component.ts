import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GhostInputComponent } from '../ghost-input';
import { FieldIndicatorComponent } from '../field-indicator/field-indicator.component';

@Component({
  selector: 'ns-form',
  standalone: true,
  imports: [ReactiveFormsModule, GhostInputComponent, FieldIndicatorComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  form: FormGroup;

  constructor(readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      password: [''],
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
