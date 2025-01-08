import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule,CommonModule,FormsModule,ReactiveFormsModule,ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnChanges {
  @Input() dashboardTitle?: string;
  @Input() dropdownValue: string = 'John';
  form: FormGroup;
  fetchedData: any;
  chartData: any;
  basicOptions: any;

  constructor(private fb: FormBuilder,private http: HttpClient) {
    this.form = this.fb.group({
      dropdown: [this.dropdownValue],
    });
    this.basicOptions = {
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };
  }

  ngOnInit(): void {
    console.log("Make API call when ngOnInit",this.dropdownValue);

    this.fetchDetails(this.dropdownValue);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges",changes);

    // if (changes['dropdownValue'] && !changes['dropdownValue'].firstChange) {

    //   console.log("Make API call when ngOnChanges changes", this.dropdownValue);

    //   this.fetchDetails(changes['dropdownValue'].currentValue);
    // }
  }

  onDropdownChange(): void {
    this.dropdownValue = this.form.get('dropdown')?.value || '';
    console.log("Make API call when onDropdownChange changes", this.dropdownValue);
    this.fetchDetails(this.dropdownValue);
  }

  fetchDetails(value: string): void {
    const apiUrl = `https://api.nationalize.io?name=${value}`;
    this.http.get(apiUrl).subscribe({
      next: (response) => {
        this.fetchedData = response;
        this.updateChartData(response);
        console.log('API Response:', response);
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    })
  }

  updateChartData(response: any) {
    const labels = response.country.map((c: any) => c.country_id);
    const data = response.country.map((c: any) => c.probability * 100);


    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Country Probabilities',
          data: data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
        },
      ],
    };
  }

}
