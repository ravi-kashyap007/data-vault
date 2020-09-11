import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// Socket Implementation
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  socket;

  constructor() { }

  // access socket server url
  initialiseSocketConnection(): void {
    this.socket = io(environment.socketUrl);

    // connection register
    this.socket.on('connect', () => {
      console.log('Connection: ', this.socket.connected);
    });
  }

  // send message
  sendMessage(msg: string): void {
    this.socket.emit('msg', 'Hello there');
  }
}
