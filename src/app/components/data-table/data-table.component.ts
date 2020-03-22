import { Component, OnInit, Input } from '@angular/core';
import { StockData } from 'src/app/models/generic-model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  dataSource: Array<StockData>;
  @Input() columnsToRender: string[];
  @Input()
  set tableDataSource(source: Array<StockData>) {
    this.dataSource = [...source];
  }
  constructor(private bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {}
  openSheet(data: StockData) {
    this.bottomSheet.open(ChartComponent, { data });
  }

  trackById(id: number) {
    return id;
  }
}
