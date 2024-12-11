import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import channelRepository from '../repositories/channelRepository.js';
import workspaceRepository from '../repositories/workspaceRepositries.js';
import ClientError from '../utils/error/clientError.js';
import ValidationError from '../utils/error/validationError.js';
export const createWorkspaceService = async (workspaceData) => {
  try {
    console.log('Workspace data received in service:', workspaceData); // Log workspaceData here

    const joinCode = uuidv4().substring(0, 6).toUpperCase();

    if (!workspaceData.workspaceId) {
      console.log('No workspaceId found. Generating a new workspaceId...');
      workspaceData.workspaceId = uuidv4(); // Generate a new workspaceId if it's missing
    }

    const response = await workspaceRepository.create({
      workspaceId: workspaceData.workspaceId,
      name: workspaceData.name,
      description: workspaceData.description,
      joinCode
    });

    // Log response from the workspaceRepository.create we get all detail
    console.log('Workspace created, response:', response);

    await workspaceRepository.addMemberToWorkspace(
      response._id,
      workspaceData.owner,
      'admin'
    );

    const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(
      response._id,
      'general'
    );

    return updatedWorkspace;
  } catch (error) {
    console.log('Create workspace service error', error);
    if (error.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: error.errors
        },
        error.message
      );
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: ['A workspace with same details already exists']
        },
        'A workspace with same details already exists'
      );
    }
    throw error;
  }
};

export const getWorkspaceUserIsMemberOfService = async (userId) => {
  try {
    const response =
      await workspaceRepository.fetchAllWorkspaceByMemberId(userId);
    return response;
  } catch (error) {
    console.log('get workspace user is member of service error', error);
    throw error;
  }
};

export const deleteWorkspaceService = async (workspaceId, userId) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId);

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    console.log(workspace.members, userId);

    const isAllowed = workspace.members.find(
      (member) => member.memberId.toString() === userId && member.role === 'admin'
    );
    if (isAllowed) {
      await channelRepository.deleteMany(workspace.channels);

      const response = await workspaceRepository.delete(workspaceId);
      return response;
    }

    throw new ClientError({
      explanation: 'User is either not a memeber or an admin of the workspace',
      message: 'User is not allowed to delete the workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
