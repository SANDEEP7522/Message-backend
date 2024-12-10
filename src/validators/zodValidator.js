import { StatusCodes } from 'http-status-codes';

import { customErrorResponse } from '../utils/common/responseObject.js';
export const validation = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      //  console.log(
      //    'Validation error in zod validator',
      //    error.errors,
      //    typeof error.errors
      //  );
      let explanation = [];
      let errorMessage = '';
      error.errors.forEach((key) => {
        explanation.push(key.path[0] + ' ' + key.message);
        errorMessage += ' : ' + key.path[0] + ' ' + key.message;
      });

      res.status(StatusCodes.BAD_REQUEST).json(
        customErrorResponse({
          message: 'Validation error' + errorMessage,
          explanation: explanation
        })
      );
    }
  };
};
