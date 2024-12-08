import express from 'express';

import { signup } from '../../controllers/userController.js';
import { userSignUpSchema } from '../../validators/userShema.js';
import { validation } from '../../validators/zodValidator.js';

const router = express.Router();

router.post('/signup', validation(userSignUpSchema), signup);

export default router;
