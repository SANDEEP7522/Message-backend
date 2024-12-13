import express from 'express';

import { getChennalByIdController } from '../../controllers/channelController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js ';

const router = express.Router();

router.get('/:channelId', isAuthenticated, getChennalByIdController);

export default router;
