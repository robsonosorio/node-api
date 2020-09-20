import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/users', async (req, res) => {
  const user = await User.create({
    name: 'Robson Osorio',
    email: 'robson.osorio@hotmail.com',
    password_hash: 'algumacoisa',
  });

  return res.json(user);
});

export default routes;
