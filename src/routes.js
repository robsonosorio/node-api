import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import ProductController from './app/controllers/ProductController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (res, req) => {
  return req.send('Hey ei, bem vindo!');
});

routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

routes.post('/users', UserController.store);

// # iniciar Session
routes.post('/sessions', SessionController.store);

// #Acesso todos usuarios
routes.use(authMiddleware);
routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);

// #Acesso usuarios ADM
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

export default routes;
