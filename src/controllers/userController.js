import { StatusCodes } from 'http-status-codes';

import { signUpService } from '../services/userService.js';
import {
  customErrorRespose,
  internalErrorResponse,
  successResponce
} from '../utils/common/responseObject.js';

export const signup = async (req, res) => {
  try {
    const user = await signUpService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponce(user, 'user created successfully'));
  } catch (error) {
    console.log('User controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorRespose(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse);
  }
};
