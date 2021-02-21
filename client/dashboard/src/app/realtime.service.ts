import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  currentUsersCounter = this.socket.fromEvent<number>('usersCounter');
  currentOrdersCounter = this.socket.fromEvent<number>('ordersCounter');
  currentSmartphonesCounter = this.socket.fromEvent<number>('smartphonesCounter');

  constructor(private socket: Socket) {
 
  }
}
