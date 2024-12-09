import { StatusCodes } from 'http-status-codes';

import User from '../schema/userSchema.js';
import Workspace from '../schema/workSpaceSchema.js';
import ClientError from '../utils/error/clientError.js';
import channelRepository from './channelRepository.js';
import crudRepository from './crudRepository.js';

const workspaceRepositries = {
  ...crudRepository(Workspace),

  // a workspace by its name from the database.
  getWorkspaceByName: async function (workspaceName) {
    const workspace = await Workspace.findOne({
      name: workspaceName
    });

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalis data send from client',
        message: 'Workspace not found',
        StatusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },

  getWorkspaceByJoinCode: async function (joinCode) {
    const workspace = await Workspace.findOne({
      joinCode
    });

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalis data send from client',
        message: 'Workspace not found',
        StatusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },

  // This code adds a new member to a workspace. It
  addMemberToWorkspace: async function (workspaceId, memberId, role) {
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalis data send from client',
        message: 'Workspace not found',
        StatusCode: StatusCodes.NOT_FOUND
      });
    }
    // isValidUser found
    const isValidUser = await User.findById(memberId);
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalis data send from client',
        message: 'User not found',
        StatusCode: StatusCodes.NOT_FOUND
      });
    }

    // is member is already in work space
    const isMemberIsAlreadyPartOfWorkspace = workspace.members.find(
      (member) => member.memberId == memberId
    );

    if (isMemberIsAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalis data send from client',
        message: 'User Already part of WORKSPACE',
        StatusCode: StatusCodes.FORBIDDEN
      });
    }

    // member push in the array formate in the workspace
    workspace.members.push({
      memberId,
      role
    });

    // save the member
    await workspace.save();

    return workspace;
  },

  addChannelToWorkspace: async function (workspaceId, channelName) {
    const workspace =
      await Workspace.findById(workspaceId).populate('channelIds');

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalis data send from client',
        message: 'User Already part of WORKSPACE',
        StatusCode: StatusCodes.FORBIDDEN
      });
    }

    const isChannelIsAlreadyPartOfWorkspace = workspace.channels.find(
      (channel) => channel.name == channelName
    );

    if (isChannelIsAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalis data send from client',
        message: 'Channel is Already part of WORKSPACE',
        StatusCode: StatusCodes.FORBIDDEN
      });
    }

    const channel = await channelRepository.create({
      name: channelName
    });

    workspace.chennals.push(channel);

    await workspace.save();

    return workspace;
  },

  fetchAllWorkspaceByMemberId: async function (memberId) {
     const workspases = await Workspace.find({
      'members.memberId' : memberId
     }).populate('members.memberId', 'username email avatart'); 

     return workspases;
  }
};

export default workspaceRepositries;
