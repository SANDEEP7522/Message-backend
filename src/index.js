import express from 'express';
import { StatusCodes } from 'http-status-codes';

import bullServerAdapter from './config/bullBoardConfig.js';
import connectDB from './config/dbConfig.js';
// import mailer from './config/mailConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/ui', bullServerAdapter.getRouter());

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ success: true, message: 'pong' });
});

app.listen(PORT, async () => {
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
