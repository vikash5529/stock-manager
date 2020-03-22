import { Component, OnInit, Inject } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { StockData } from 'src/app/models/generic-model';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: StockData, private storeService: StoreService) {}

  lineChartData: ChartDataSets[] = [{ data: [], label: 'History' }];

  lineChartLabels: Label[] = [];

  lineChartOptions: ChartOptions = {
    responsive: true
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: 'green'
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  ngOnInit(): void {
    this.data.history.forEach(data => {
      this.lineChartData[0].data.push(data.price);
      this.lineChartLabels.push(`${data.lastUpdated}`);
    });
    console.log(this.lineChartLabels, this.lineChartData);
  }
}
