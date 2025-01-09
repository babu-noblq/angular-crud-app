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
export class DashboardComponent implements OnChanges {
  @Input() dashboardTitle?: string;
  @Input() nameDropdown?: string;
  fetchedData: any;
  chartData: any;
  basicOptions: any;

  constructor(private http: HttpClient) {

    this.basicOptions = {
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges dashboard",changes);
    if (changes['nameDropdown']) {

      console.log("Make API call when ngOnChanges changes", this.nameDropdown);

      this.fetchDetails(changes['nameDropdown'].currentValue);
    }
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
