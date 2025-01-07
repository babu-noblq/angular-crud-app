import { Component, Input } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule, AutoCompleteModule,ReactiveFormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @Input() title: string | undefined;
  form: FormGroup;

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
