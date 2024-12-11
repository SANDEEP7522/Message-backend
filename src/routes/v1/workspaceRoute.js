import express from 'express';

import {
  createWorkspaceController,
  getWorkspaceUserIsMemberOfController
} from '../../controllers/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { createWorkspaceSchema } from '../../validators/workspaceSchema.js';
import { validation } from '../../validators/zodValidator.js';

const router = express.Router();

router.post(
  '/',
  isAuthenticated,
  validation(createWorkspaceSchema),
  createWorkspaceController
);

router.get('/', isAuthenticated, getWorkspaceUserIsMemberOfController);

export default router;
