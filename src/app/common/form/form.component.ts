import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-form',
  // standalone: false,
  imports: [ButtonModule, AutoCompleteModule,ReactiveFormsModule,CommonModule, InputTextModule, FloatLabel,FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() formTitle: string | undefined;
  form: FormGroup;
  value1: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['',Validators.required],
      mobile: ['',Validators.required],
    })
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Details', this.form.value);
    } else {
      console.log("error")
    }
  }
}