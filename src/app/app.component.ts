import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { FormComponent } from './common/form/form.component';

@Component({
  selector: 'app-root',
  // standalone: false,
  imports: [CommonModule, DashboardComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular Crud App'
  dashboardTitle = 'Simple API call when dropdown change';
  formTitle = 'Simple form submit';

}
