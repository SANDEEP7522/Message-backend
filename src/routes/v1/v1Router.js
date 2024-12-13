import express from 'express';

import channelRouter from '../../schema/channelSchema.js';
import userRouter from './users.js';
import workspaceRouter from './workspaceRoute.js';

const router = express.Router();

router.use('/users', userRouter);

router.use('/workspaces', workspaceRouter);

router.use('/channels', channelRouter);

export default router;
