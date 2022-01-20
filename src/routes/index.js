import express from 'express';
const router = express.Router();

import Users from './user';

router.use('/users', Users);

export default router;
