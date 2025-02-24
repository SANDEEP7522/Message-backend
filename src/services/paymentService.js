import crypto from 'crypto'; // internal nodejs package

import { RAZORPAY_KEY_SECRET } from '../config/serverConfig.js';
import paymentRepository from '../repositories/paymentRepository.js';

export const createPaymentService = async (orderId, amount) => {
  const payment = await paymentRepository.create({
    orderId,
    amount
  });
  return payment;
};

export const updatePaymentStatusService = async (
  orderId,
  status,
  paymentId,
  signature
) => {
  // veryfy payment is success or not

  if (status === 'success') {
    const sharesponse = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');
    console.log('sharesponse', sharesponse, 'signature', signature);
    if (sharesponse === signature) {
      await paymentRepository.updateOrder(orderId, {
        status: 'success',
        paymentId
      });
    } else {
      throw new Error('Payment Failed');
    }
  }
};
