import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import ProductController from './app/controllers/ProductController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  return res.send('Hey ei, bem vindo!');
});

routes.post('/users', UserController.store);

// # iniciar Session
routes.post('/sessions', SessionController.store);

// #Acesso todos usuarios
// routes.use(authMiddleware);
routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);

// #Acesso usuarios ADM
routes.post('/products', upload.single('logo'), ProductController.store);
routes.put('/products/:id', upload.single('logo'), ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

export default routes;
