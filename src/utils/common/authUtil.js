import jwt from 'jsonwebtoken';

import { JWT_EXPIRY, JWT_SECRET } from '../../config/serverConfig.js';

export const createJWT = (payload) => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRY
    });

    return token;
  } catch (error) {
    console.error('Error creating JWT:', error);
    throw new Error('Failed to create JWT');
  }
};
