import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnModuleInit, PayloadTooLargeException } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';
import { Console } from 'console';

// @WebSocketGateway(81, { // ELIMINAR EL PUERTO PARA Q FUNCIONE, ANALIZAR Q ESTA RARO 
//   // name: 'chat',
//   cors: {
//     // origin: [
//     //   'http://localhost:3000',
//     //   'mipagina.com'
//     // ]
//     origin: '*'
//   }
// })

@WebSocketGateway(
  {
    cors: {
      origin: [
        'http://localhost:3000',
        'http://192.168.0.20:3000',
      ]
    }
  }
)

// export class ChatGateway implements OnModuleInit  {

//   @WebSocketServer( )
//   public server: Server;

//   constructor(private readonly chatService: ChatService) {}

//   onModuleInit() {
    
//     this.server.on('connection', (socket: Socket) => {

//       console.log('Client conected: ', socket.id);

//       socket.on('disconnect', () => {
//         console.log('Client disconected: ', socket.id)
//       })

//     })

//   }

// }

export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  afterInit(server: any){
    console.log('Esto se ejecuta cuando inicia')
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Alguien se conecto', client.id)
  }

  handleDisconnect(client: any) {
    console.log('Alguien se desconecto', client.id)
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, data: { message: string }){
    console.log(data)
    this.server.emit('message', {
      body: data.message,
      from: client.id
    })
  }

  // @SubscribeMessage('message')
  // handleMessage(client: Socket, payload: { message: string }){
  //   const msj = payload.message
  //   console.log(msj)
  //   // this.server.emit('message', message)
  // }

  // @SubscribeMessage('prueba')
  // handleIncomingMessage(client: Socket, message: string){
  //   console.log(message)
  //   this.server.emit('new_prueba', message)
  // }

}
