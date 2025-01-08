import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import jasonData from './data.json'

@Component({
  selector: 'app-chart',
  imports: [ButtonModule,CommonModule,FormsModule,ReactiveFormsModule,ChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @Input() chartTitle?: string;
  @Input() dropdownValue: string = 'India';
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
    // this.updateChartData(jasonData);
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
    const apiUrl = `http://universities.hipolabs.com/search?country=${value}`;
    this.http.get<any[]>(apiUrl).subscribe({
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

  updateChartData(response: any[]) {
    console.log(response?.length, "response")
    const stateCounts = this.groupByKey(response, 'state-province');

    const labels = Object.keys(stateCounts);
    const data = Object.values(stateCounts);


    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'State Count',
          data: data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
    };

  }
  groupByKey(array: any[], key: string): { [key: string]: number } {
    return array.reduce((acc, obj) => {
      const groupKey = obj[key] || 'Unknown-State';
      acc[groupKey] = (acc[groupKey] || 0) + 1;
      return acc;
    }, {});
  }
}
