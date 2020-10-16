import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import ProductController from './app/controllers/ProductController';

// import SessionController from './app/controllers/SessionController';
// import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  return res.send('Hey ei, bem vindo!');
});
// #SESSION
// routes.post('/sessions', SessionController.store);
// routes.use(authMiddleware);

// #USERS
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);

routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

// #PRODUCTS
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
// #Acesso usuarios ADM
routes.post('/products', upload.single('logo'), ProductController.store);
routes.put('/products/:id', upload.single('logo'), ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

export default routes;
