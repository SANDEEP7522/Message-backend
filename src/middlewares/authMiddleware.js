import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/serverConfig.js';
import userRepository from '../repositories/userRepository.js';
import {
  customErrorResponse,
  internalErrorResponse
} from '../utils/common/responseObject.js';

// Middleware to check authentication
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    // Check if token is provided
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: 'No authentication token provided by the client',
          message: 'Authentication required'
        })
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: 'Invalid token sent by the client',
          message: 'Authentication failed'
        })
      );
    }

    // Fetch the user based on the token's payload
    const user = await userRepository.getById(decoded.id);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json(
        customErrorResponse({
          explanation: 'User associated with the token does not exist',
          message: 'Invalid authentication'
        })
      );
    }

    // Attach user ID to the request object
    req.user = user.id;
    next();
  } catch (error) {
    console.error('isAuthenticated middleware Error:', error);

    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: 'Invalid token sent by the client',
          message: 'Authentication Failed'
        })
      );
    }

    // Handle other unexpected errors
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
