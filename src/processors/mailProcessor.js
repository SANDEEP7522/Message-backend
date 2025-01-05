import mailer from '../config/mailConfig.js';
import mailQueue from '../queues/mailQueue.js';

//  This code processes a mail queue by
// sending each email in the queue using a mailer object,
//  and logs success or error messages to the console for each email.

mailQueue.process(async (job) => {
  const emailData = job.data;
  console.log('Processing email', emailData);
  try {
    const response = await mailer.sendMail(emailData);
    console.log('Email sent', response);
  } catch (error) {
    console.log('Error processing email', error);
  }
});
