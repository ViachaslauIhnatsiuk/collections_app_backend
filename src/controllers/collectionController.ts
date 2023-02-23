import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import * as collectionService from '../services/collectionService';
import * as itemService from '../services/itemService';
import { createError, checkRequestBody } from '../services/errorService';

const createCollection = async (request: Request, response: Response) => {
  const bodyRequestError = checkRequestBody(request.body, [
    'title',
    'description',
    'topic',
    'imageUrl',
    'ownerId',
    'itemExtraFields',
  ]);

  if (bodyRequestError) {
    return response
      .status(400)
      .send(createError(400, 'bad request: ' + bodyRequestError));
  }

  const { title, description, topic, imageUrl, ownerId, itemExtraFields } = request.body;

  try {
    const newCollection = await collectionService.createCollection({
      title,
      description,
      topic,
      imageUrl,
      ownerId,
      itemExtraFields,
    });

    response.json(newCollection);
  } catch (error) {
    return console.log(error);
  }
};

const getCollections = async (_: Request, response: Response) => {
  try {
    const collections = await collectionService.findCollections({});

    response.json(collections);
  } catch (error) {
    console.log(error);
  }
};

const getCollectionById = async (request: Request, response: Response) => {
  try {
    const collection = await collectionService.findCollectionById(
      request.params['collectionId']
    );

    response.json(collection);
  } catch (error) {
    return response.status(404).send(createError(404, 'Collection not found!'));
  }
};

const updateCollection = async (request: Request, response: Response) => {
  const bodyRequestError = checkRequestBody(request.body, [
    'title',
    'description',
    'topic',
    'imageUrl',
  ]);

  if (bodyRequestError) {
    return response
      .status(400)
      .send(createError(400, 'bad request: ' + bodyRequestError));
  }

  const { title, description, topic, imageUrl } = request.body;

  try {
    const updatedCollection = await collectionService.updateCollection(
      request.params['collectionId'],
      { title, description, topic, imageUrl }
    );

    response.json(updatedCollection);
  } catch (error) {
    console.log(error);
  }
};

const deleteCollection = async (request: Request, response: Response) => {
  try {
    const collectionId = request.params['collectionId'];
    const deletedCollection = await collectionService.deleteCollectionById(collectionId);

    const itemsFromCollection = await itemService.findItems({
      collectionId: { $in: [new ObjectId(collectionId)] },
    });
    const itemsIds = itemsFromCollection.map(({ _id }) => _id);
    const deletedItems = await itemService.deleteItemsByIds(itemsIds);

    response.json([deletedCollection, deletedItems]);
  } catch (error) {
    console.log(error);
  }
};

export {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
};
