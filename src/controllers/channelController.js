import { StatusCodes } from 'http-status-codes';

import { getChennalByIdService } from '../services/channelService';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObject.js';

export const getChennalByIdController = async (req, res) => {
  try {
    const response = await getChennalByIdService(req.params.channelId);

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Channel fetched successfully'));
  } catch (error) {
    console.log('get channel by id controller error', error);
    if (error.statusCode) {
      return res.statusCode(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
