import { CommonModule } from '@angular/common';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { FormComponent } from './common/form/form.component';
import { ChartComponent } from './common/chart/chart.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-root',
  // standalone: false,
  imports: [CommonModule, DashboardComponent, FormComponent, ChartComponent,FormsModule,ReactiveFormsModule, SplitterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular simple Dashboard'
  subTitle = 'Deployed in Netlify Cloud'
  dashboardTitle = 'Simple API call when dropdown change';
  formTitle = 'Simple form submit';
  countryDropdown = 'India'
  nameDropdown = 'John'

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      countryDropdown: [this.countryDropdown],
      nameDropdown: [this.nameDropdown],
    });
  }

  onCountryDropdownChange(): void {
    this.countryDropdown = this.form.get('countryDropdown')?.value || '';
    console.log("Make API call when onDropdownChange changes", this.countryDropdown);
  }

  onNameDropdownChange(): void {
    this.nameDropdown = this.form.get('nameDropdown')?.value || '';
    console.log("Make API call when onNameDropdownChange changes", this.nameDropdown);
  }

}
