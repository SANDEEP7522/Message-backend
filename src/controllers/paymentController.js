import { StatusCodes } from 'http-status-codes';

import razorpay from '../config/razorpayConfig.js';
import { CURRENCY, RECEIPT_SECRET } from '../config/serverConfig.js';
import {
  createPaymentService,
  updatePaymentStatusService
} from '../services/paymentService.js';
import { internalErrorResponse } from '../utils/common/responseObject.js';

export const createOrderController = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount,
      currency: CURRENCY,
      receipt: RECEIPT_SECRET
    };

    const order = await razorpay.orders.create(options);

    console.log('order...', order);

    await createPaymentService(order.id, req.body.amount);

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

    await updatePaymentStatusService(
      req.body.orderId,
      req.body.status,
      req.body.paymentId,
      req.body.signature
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Payment captured successfully',
      data: ''
    });
  } catch (error) {
    console.log('Error in capture payment Controller:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse);
  }
};
