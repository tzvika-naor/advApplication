import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  currentCounter = this.socket.fromEvent<number>('count');
  
  currentOrders = this.socket.fromEvent<number>('countOrders');
  currentUsers = this.socket.fromEvent<number>('countUsers');
  currentSmartphones = this.socket.fromEvent<number>('countSmartphones');


  constructor(private socket: Socket) {
 
  }
}
