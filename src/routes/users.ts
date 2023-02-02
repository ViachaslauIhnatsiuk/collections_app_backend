import { Router } from 'express';
import * as usersController from '../controllers/userController';

const usersRouter = Router();

usersRouter.get('/', usersController.getUsers);

usersRouter.get('/:id', usersController.getUserById);

usersRouter.put('/:id', usersController.updateUser);

usersRouter.delete('/:id', usersController.deleteUser);

export { usersRouter };
