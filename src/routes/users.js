import express from 'express';

import { randomUUID } from 'crypto';
const router = express.Router();

import { Users } from '../lowdb';

router.get('/', async (req, res) => {
  const users = await Users.getUsers();

  return res.send(users);
});

router.post('/createUser', async (req, res) => {
  const { user = null } = req.body;
  if (!user) {
    return res.status(400).send({ message: 'No data to save.' });
  }
  user.id = randomUUID();
  const users = await Users.addUser(user);

  return res.send(users);
});

export default router;
