import { StatusCodes } from 'http-status-codes';

import channelRepository from '../repositories/channelRepository.js';
import ClientError from '../utils/error/clientError.js';

export const getChennalByIdService = async (channelId) => {
  try {
    const channel = await channelRepository.getById(channelId);

    if (!channel) {
      throw new ClientError({
        explanation: 'Invalid data sended from the clent',
        message: 'Channel not found',
        StatusCode: StatusCodes.NOT_FOUND
      });
    }

    return channel;
  } catch (error) {
    console.log('Get channel by id service error', error);
    throw error;
  }
};
