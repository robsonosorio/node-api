import { Router } from 'express';
import SessionController from './app/controllers/SessionController';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth'

const routes = new Router();

routes.get('/', (res, req) => {
  return req.json({ Bem: 'vindo' });
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
