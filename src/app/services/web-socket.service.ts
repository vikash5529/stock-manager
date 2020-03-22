import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubjectConfig, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { StockData } from '../models/generic-model';
import { map, bufferTime, auditTime } from 'rxjs/operators';
import { StoreService } from './store.service';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private webSocketSubject: WebSocketSubject<Array<Array<any>>>;
  private readonly webSocketURL = 'ws://stocks.mnet.website';
  private webSocketConfig: WebSocketSubjectConfig<any> = {
    url: this.webSocketURL,
    openObserver: {
      next: () => {
        // this.globalMessagingService.setSocketReconnectionMessage(null);
      }
    },
    closeObserver: {
      next: closeEvent => {
        // this.reconnect();
      }
    }
  };

  constructor(private storeService: StoreService) {}
  public messageObserver(): Observable<any> {
    this.webSocketSubject = webSocket(this.webSocketConfig);
    return this.webSocketSubject.asObservable().pipe(
      map(messages => {
        const mappedMessages: Array<StockData> = this.responseMapper(messages);
        this.storeService.setData(mappedMessages);
        return this.storeService.getData();
      })
    );
  }

  private responseMapper(messages: Array<Array<any>>): Array<StockData> {
    return messages.map(message => {
      return {
        name: message[0],
        price: +(message[1] as number).toFixed(2)
      };
    });
  }
}
