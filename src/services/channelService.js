import { StatusCodes } from 'http-status-codes';

import channelRepository from '../repositories/channelRepository.js';
import ClientError from '../utils/error/clientError.js';
import { isUserMemberOfWorkspace } from './workspaceService.js';

// get channel using by the id og the channels
export const getChannelByIdService = async (channelId, userId) => {
  try {
    // get channel with workspace
    const channel =
      await channelRepository.getChannelWithWorkspaceDetails(channelId);
    console.log( "Chennel 11 line",channel);

    // check if channel exists 
    if (!channel || !channel.workspaceId) {
      throw new ClientError({
        message: 'Channel not found with the provided ID',
        explanation: 'Invalid data sent from the client',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    // check if user is a member of the workspace
    const isUserPartOfWorkspace = isUserMemberOfWorkspace(
      channel.workspaceId,
      userId
    );

    // check if user is a member of the workspace
    if (!isUserPartOfWorkspace) {
      throw new ClientError({
        message:
          'User is not a member of the workspace and hence cannot access the channel',
        explanation: 'User is not a member of the workspace', 
        statusCode: StatusCodes.UNAUTHORIZED // status code get from http status codes 
      });
    }
    
    return channel;
  } catch (error) {
    console.log('Get channel by ID service error', error);
    throw error;
  }
};
