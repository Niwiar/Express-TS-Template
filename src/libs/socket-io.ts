import { Server, Socket } from 'socket.io';
import http from 'http';

let io: Server;
export const socketServer = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000,
      skipMiddlewares: true,
    },
  });
};

export const socketIO = () => {
  io.on('connection', (socket: Socket) => {
    console.log('A new client connected!');
    socket.on('joinRoom', (room: string) => {
      socket.join(room);
      // socket.emit('checkConnect', `Welcome to Room ${room}`);
    });
    // Listen for msg events from this client
    socket.on('msg', (msg: string) => {
      console.log(msg);
    });

    // Listen for the disconnect event
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

type SocketData = {
  Key: string;
  Data: any;
};

type SocketDataToRoom = {
  Room: string;
} & SocketData;

export const sendSocketToRoom = ({ Room, Key, Data }: SocketDataToRoom) =>
  io.to(Room).emit(Key, Data);

export const sendSocketToServer = ({ Key, Data }: SocketData) =>
  io.emit(Key, Data);
