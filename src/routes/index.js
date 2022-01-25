import express from 'express';
const router = express.Router();

import Users from './user';

router.use('/users', Users);
router.use((req, res, next) => next());

export default router;
