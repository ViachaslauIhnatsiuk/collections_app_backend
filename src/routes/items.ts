import { Router } from 'express';
import * as itemController from '../controllers/itemController';

const itemsRouter = Router();

itemsRouter.post('/', itemController.createItem);

itemsRouter.get('/', itemController.getItems);

itemsRouter.get('/:itemId', itemController.getItemById);

itemsRouter.put('/:itemId', itemController.updateItem);

itemsRouter.delete('/:itemId', itemController.deleteItem);

export { itemsRouter };
