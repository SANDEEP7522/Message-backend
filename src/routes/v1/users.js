import express from 'express';

import { signin, signup } from '../../controllers/userController.js';
import {
  userSignInSchema,
  userSignUpSchema
} from '../../validators/userShema.js';
import { validation } from '../../validators/zodValidator.js';

const router = express.Router();

router.post('/signup', validation(userSignUpSchema), signup);

router.post('/signin', validation(userSignInSchema), signin);

export default router;
