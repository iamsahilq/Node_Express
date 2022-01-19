import express from 'express';
const router = express.Router();

import Users from './users';

router.use('/users', Users);

export default router;
