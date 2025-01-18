import { StatusCodes } from 'http-status-codes';

import {
  addChannelToWorkspaceService,
  addMemberToWorkspaceService,
  createWorkspaceService,
  deleteWorkspaceService,
  getWorkspaceByJoinCodeService,
  getWorkspaceService,
  getWorkspaceUserIsMemberOfService,
  resetWorkspaceJoinCodeService,
  updateWorkspaceService
} from '../services/workspaceService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObject.js';

// This code is likely used in a RESTful API, It handles a request to create a new workspace
export const createWorkspaceController = async (req, res) => {
  try {
    // Log incoming data to see if workspaceId or other expected data is missing
    console.log('Request body:', req.body);

    const response = await createWorkspaceService({
      ...req.body,
      owner: req.user
    });
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Workspace created successfully'));
  } catch (error) {
    console.log('Error in createWorkspaceController:', error); // Log any error here

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const getWorkspaceUserIsMemberOfController = async (req, res) => {
  try {
    const response = await getWorkspaceUserIsMemberOfService(req.user);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspaces fetched successfully'));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse, 'Internal Server Error');
  }
};

export const deleteWorkspaceController = async (req, res) => {
  try {
    const response = await deleteWorkspaceService(
      req.params.workspaceId,
      req.user
    );
    console.log('Response from deleteWorkspaceService:', response);

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace deleted successfully'));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const getWorkspaceController = async function (req, res) {
  try {
    const response = await getWorkspaceService(
      req.params.workspaceId,
      req.user
    );
    console.log('Response from getWorkspaceService:', response);

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace get successfully'));
  } catch (error) {
    console.log('Get workspace controller Error:', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

// completed here problem
export const getWorkspaceByJoinCodeController = async (req, res) => {
  try {
    console.log('Request params:', req.params);
    console.log('Join code:', req.params.joinCode);

    const response = await getWorkspaceByJoinCodeService(
      req.params.joinCode,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'));
  } catch (error) {
    console.log('Get workspace by joincode controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const updateWorkspaceController = async (req, res) => {
  try {
    console.log('Request params:', req.params.workspaceId);
    console.log('Request body:', req.body); // here no problem
    console.log('Request user:', req.body);

    const response = await updateWorkspaceService(
      req.params.workspaceId,
      req.body,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace updated successfully'));
  } catch (error) {
    console.log('update workspace controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const addMemberToWorkspaceController = async (req, res) => {
  try {
    // console.log('Incoming request data:', {
    //   workspaceId: req.params.workspaceId,
    //   memberId: req.body.memberId,
    //   role: req.body.role,
    //   user: req.user
    // });
    const response = await addMemberToWorkspaceService(
      req.params.workspaceId,
      req.body.memberId,
      req.body.role || 'member',
      req.user
    );
    console.log('reponse from', response);

    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Member added to workspace successfully')
      );
  } catch (error) {
    console.log('add member to workspace controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
export const addChannelToWorkspaceController = async (req, res) => {
  try {
    const response = await addChannelToWorkspaceService(
      req.params.workspaceId,
      req.body.channelName,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Channel added to workspace successfully')
      );
  } catch (error) {
    console.log('add channel to workspace controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const resetWorkspaceJoinCodeController = async (req, res) => {

  
  try {

    console.log('resetWorkspaceJoinCodeController called');
    console.log('Request Params:', req.params);
    console.log('Workspace ID:', req.params.workspaceId);
    console.log('User:', req.user);

    const response = await resetWorkspaceJoinCodeService(
      req.params.workspaceId,
      req.user
    );
    console.log('reset', response);

    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Reset workspace join code successfully')
      );
  } catch (error) {
    console.log('reset workspace controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
