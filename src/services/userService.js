import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import { ENABLE_EMAIL_VERIFICATION } from '../config/serverConfig.js';
import { addEmailtoMailQueue } from '../producers/mailQueueProducer.js';
import userRepository from '../repositories/userRepository.js';
import { createJWT } from '../utils/common/authUtil.js';
import { verifyEmailMail } from '../utils/common/mailObject.js';
import ClientError from '../utils/error/clientError.js';
import validationError from '../utils/error/validationError.js';

// signUpService functions
export const signUpService = async (data) => {
  try {
    const newUser = await userRepository.signUpUser(data);

    if (ENABLE_EMAIL_VERIFICATION === 'true') {
      // send verification email
      addEmailtoMailQueue({
        ...verifyEmailMail(newUser.verificationToken),
        to: newUser.email
      });
    }

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

export const verifyTokenService = async (token) => {
  try {
    const user = await userRepository.getByToken(token);
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Invalid token',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }
    // check if the token has expired or not
    if (user.verificationTokenExpiry < Date.now()) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Token has expired',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    await user.save();
    console.log(user);
    return user;
  } catch (error) {
    console.log('User service error', error);
    throw error;
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
      _id: user._id,
      token: createJWT({ id: user._id, email: user.email })
    };
  } catch (error) {
    console.log('signInSerice Error', error);
    throw error;
  }
};
