import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import ProductController from './app/controllers/ProductController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (res, req) => {
  return req.json({ Bem: 'vindo' });
});

// #Users
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);

// #Product
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
export default routes;
