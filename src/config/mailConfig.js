import nodemailer from 'nodemailer';

import { MAIL_ID, MAIL_PASSWORD } from './serverConfig.js';

// create reusable transporter object using the default SMTP transports for nodemailer
export default nodemailer.createTransport({
  service: 'Gmail', // use the default SMTP transport

  host: 'smtp.gmail.com', // specify the SMTP host

  port: 465, // specitfy the SMPT port

  secure: true,

  auth: {
    user: MAIL_ID,
    pass: MAIL_PASSWORD
  }
});
