import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StockData } from 'src/app/models/generic-model';
import { WebSocketService } from 'src/app/services/web-socket.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  dataSource: Array<StockData>;
  columnsToDisplay: string[] = ['ticker', 'price', 'updatedAt', 'percentageChange'];
  private subscription: Subscription;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.subscription = this.webSocketService.messageObserver().subscribe((messages: Array<StockData>) => {
      this.dataSource = [...messages];
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
