import { StatusCodes } from 'http-status-codes';

import razorpay from '../config/razorpayConfig.js';
import { CURRENCY, RECEIPT_SECRET } from '../config/serverConfig.js';
import { internalErrorResponse } from '../utils/common/responseObject.js';

export const createOrderController = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: CURRENCY,
      receipt: RECEIPT_SECRET,
    };

    const order = await razorpay.orders.create(options);

    console.log('order...', order);

    if (!order) {
      throw new Error('Failed to cretated');
    }

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Odrer created successfully',
      data: order
    });
  } catch (error) {
    console.log('Error in create Order Controller:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse);
  }
};

export const capturePaymentController = async (req, res) => {
  try {
    console.log('Request params:', req.body);

    return res.status(StatusCodes.OK).json({
      Success: true,
      message: 'Payment captured successfully',
      data: payment
    });
  } catch (error) {
    console.log('Error in capture payment Controller:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse);
  }
};
