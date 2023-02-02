import { Router } from 'express';
import * as collectionController from '../controllers/collectionController';

const collectionsRouter = Router();

collectionsRouter.get('/', collectionController.getCollections);

collectionsRouter.get('/:collectionId', collectionController.getCollectionById);

collectionsRouter.post('/', collectionController.createCollection);

collectionsRouter.put('/:collectionId', collectionController.updateCollection);

collectionsRouter.delete('/:collectionId', collectionController.deleteCollection);

export { collectionsRouter };
