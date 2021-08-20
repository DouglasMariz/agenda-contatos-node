import * as express from 'express';
import {Router} from 'express';

import AuthMiddleware from '@middlewares/authMiddleware';

import AuthController from '@controllers/AuthController';
import UserController from '@controllers/UserController';
import PersonController from '@controllers/PersonController';

const router: Router = express.Router();

router.post('/auth', AuthController.authenticate);

router.get('/users', AuthMiddleware, UserController.index);
router.post('/users', AuthMiddleware, UserController.store);
router.post('/users/find', AuthMiddleware, UserController.find);
router.patch('/users', AuthMiddleware, UserController.update);
router.delete('/users', AuthMiddleware, UserController.delete);

router.get('/persons', AuthMiddleware, PersonController.index);
router.post('/persons', AuthMiddleware, PersonController.store);
router.post('/persons/find', AuthMiddleware, PersonController.find);
router.patch('/persons', AuthMiddleware, PersonController.update);
router.delete('/persons', AuthMiddleware, PersonController.delete);

export default router;
