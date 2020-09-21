import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (res, req) => {
  return req.json({ Bem: 'vindo' });
});

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

export default routes;
