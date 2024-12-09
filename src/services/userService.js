import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import userRepository from '../repositories/userRepository.js';
import { createJWT } from '../utils/common/authUtil.js';
import ClientError from '../utils/error/clientError.js';
import validationError from '../utils/error/validationError.js';

// signUpService functions
export const signUpService = async (data) => {
  try {
    const newUser = await userRepository.create(data);
    return newUser;
  } catch (error) {
    console.log('User Service error', error);
    if (error.name === 'ValidationError') {
      throw new validationError(
        {
          error: error.errors
        },
        error.message
      );
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new validationError(
        {
          error: ['A user with same Email or username already exists']
        },
        'A user with same Email or username already exists'
      );
    }
  }
};

// signInService functions

export const signInService = async (data) => {
  try {
    const user = await userRepository.getByEmail(data.email);
    // if user not found
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid email or password',
        message: 'No resistered user found',
        StatusCodes: StatusCodes.NOT_FOUND
      });
    }

    // match the incoming password with the hashed password
    const isMatch = bcrypt.compareSync(data.password, user.password);
    // if password doesnot match
    if (!isMatch) {
      throw new ClientError({
        explanation: 'Invalid email or password',
        message: 'Invalid password try again',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    // return token and user details
    return {
      username: user.username,
      avator: user.avator,
      email: user.email,

      token: createJWT({ id: user._id, email: user.email })
    };
  } catch (error) {
    console.log('signInSerice Error', error);
    throw error;
  }
};
