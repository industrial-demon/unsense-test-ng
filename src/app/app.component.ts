import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'ns-root',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'unsense-test-ng';
}
