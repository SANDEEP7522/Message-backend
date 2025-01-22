import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { Server } from 'socket.io';

import bullServerAdapter from './config/bullBoardConfig.js';
import connectDB from './config/dbConfig.js';
// import mailer from './config/mailConfig.js';
import { PORT } from './config/serverConfig.js';
import ChannelSocketHandlers from './controllers/channelSoketController.js';
import MessageSocketHandlers from './controllers/messageSocketController.js';
import { verifyEmailController } from './controllers/workspaceController.js';
import apiRouter from './routes/apiRoutes.js';

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/ui', bullServerAdapter.getRouter());

app.use('/api', apiRouter);

app.get('/verify/:token', verifyEmailController);

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ success: true, message: 'pong' });
});

// Handle incoming socket connections
io.on('connection', (socket) => {
  console.log('............a user connected', socket.id);

  // Handle messages from the client
  // socket.on('messageFromClient', (data) => {
  //  console.log('Message from client', data);

  // Broadcast the message to all clients, converting it to uppercase
  // io.emit('new message', data.toUpperCase());
  // });

  // messageHandlers(io, socket);

  MessageSocketHandlers(io, socket);
  ChannelSocketHandlers(io, socket);
});

server.listen(PORT, async () => {
  console.log(`Server running on post ${PORT}`);
  connectDB();

  // // mailer response test
  //   const mailerResponse = await mailer.sendMail({
  //     from: 'sahuji04082000@gmail.com',
  //     to: 'sahuji04082000@gmail.com',
  //     subject: 'Hello from Nodemailer',
  //     text: 'This is a test email sent using Nodemailer.'
  //   });
  //   console.log('mailerResponse msg', mailerResponse);
});
