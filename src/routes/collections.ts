import { Router } from 'express';
import * as collectionController from '../controllers/collectionController';
import { itemsRouter } from './items';

const collectionsRouter = Router();

collectionsRouter.use('/:collectionId/items', itemsRouter);

collectionsRouter.post('/', collectionController.createCollection);

collectionsRouter.get('/', collectionController.getCollections);

collectionsRouter.get('/:collectionId', collectionController.getCollectionById);

collectionsRouter.put('/:collectionId', collectionController.updateCollection);

collectionsRouter.delete('/:collectionId', collectionController.deleteCollection);

export { collectionsRouter };
