import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnChanges {
  @Input() dashboardTitle: string | undefined;
  @Input() dropdownValue: string = 'John';
  form: FormGroup;
  fetchedData: any;

  constructor(private fb: FormBuilder,private http: HttpClient) {
    this.form = this.fb.group({
      dropdown: [''],
    })
  }

  ngOnInit(): void {
    console.log("Make API call when ngOnInit",this.dropdownValue);

    this.form.get('dropdown')?.setValue(this.dropdownValue || "");
    this.fetchDetails(this.form.get('dropdown')?.value);  
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges",changes);

    // if (changes['dropdownValue'] && !changes['dropdownValue'].firstChange) {

    //   console.log("Make API call when ngOnChanges changes",this.dropdownValue);

    //   this.fetchDetails(changes['dropdownValue'].currentValue);
    // }
  }

  onDropdownChange(): void {
    this.dropdownValue = this.form.get('dropdown')?.value;
    console.log("Make API call when onDropdownChange changes", this.dropdownValue);
    this.fetchDetails(this.dropdownValue);
  }

  fetchDetails(value: string) {
    const apiUrl = `https://api.nationalize.io?name=${value}`;
    this.http.get(apiUrl).subscribe({
      next: (response) => {
        this.fetchedData = response;
        console.log('API Response:', response);
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    })
  }

}
