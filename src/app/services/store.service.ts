import { Injectable } from '@angular/core';
import { StockData } from '../models/generic-model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private datePipe: DatePipe) {}
  public isCurrentThemeDark = false;
  private storeMap: Map<string, StockData> = new Map();

  public setData(stocks: Array<StockData>): void {
    stocks.forEach(stock => {
      const key = stock.name;
      if (!this.storeMap.has(key)) {
        stock.timeStamp = new Date();
        stock.updatedAt = this.getFormattedTime();
        stock.className = 'stagnant';
        this.storeMap.set(key, stock);
      } else {
        this.updateStockData(key, stock);
      }
    });
  }
  public getData(): Array<StockData> {
    const data = [];
    for (const value of this.storeMap.values()) {
      data.push(value);
    }
    return data;
  }

  private getFormattedTime(updatedAt?: string | Date): Date | string {
    const formattedTime = this.datePipe.transform(new Date(), 'dd MMM  h:mm aaa');

    if (updatedAt) {
      const diffrence = +new Date() - +new Date(updatedAt);
      const minutes = Math.floor(diffrence / 1000 / 60);
      return minutes <= 0 ? 'A few Seconds' : minutes > 1 && minutes < 5 ? `${minutes} minutes` : formattedTime;
    }

    return formattedTime;
  }

  private updateStockData(key: string, stock: StockData): void {
    let existingData: StockData = this.storeMap.get(key);

    if (existingData.price > stock.price) {
      const change = this.getPercentageChange(Math.abs(existingData.price), stock.price);
      existingData.percentageChange = Math.abs(+change);

      existingData = this.updateExistingData(existingData, 'rising', stock.price, true);
    } else if (existingData.price < stock.price) {
      const change = this.getPercentageChange(stock.price, existingData.price);
      existingData.percentageChange = -Math.abs(+change);
      existingData = this.updateExistingData(existingData, 'falling', stock.price, true);
    } else {
      this.updateExistingData(existingData, 'stagnant', stock.price, false);
    }
    this.storeMap.set(key, existingData);
  }

  private updateExistingData(
    existingData: StockData,
    className: string,
    updatedPrice: number,
    updateTimeStamp: boolean
  ): StockData {
    existingData.price = updatedPrice;
    existingData = this.updateHistory(existingData, existingData.timeStamp, existingData.price);

    if (updateTimeStamp) {
      existingData.timeStamp = new Date();
    }

    existingData.className = className;
    existingData.updatedAt = this.getFormattedTime(existingData.timeStamp);
    return existingData;
  }

  private getPercentageChange(oldNumber: number, newNumber: number): string {
    const decreaseValue = Math.floor(oldNumber) - Math.floor(newNumber);
    const percentageChange = (decreaseValue / Math.floor(oldNumber)) * 100;
    return percentageChange.toFixed(2);
  }

  private updateHistory(stockData: StockData, timeStamp: string | Date, price: number): StockData {
    const lastUpdated = this.datePipe.transform(timeStamp, 'dd MMM  h:mm aaa');
    if (!stockData.history) {
      stockData.history = [{ lastUpdated, price }];
    } else {
      stockData.history.push({ lastUpdated, price });
    }
    if (stockData.history.length >= 10) {
      stockData.history.shift();
    }
    return stockData;
  }
}
