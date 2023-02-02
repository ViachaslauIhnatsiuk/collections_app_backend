import { Response, Request } from 'express';
import * as collectionService from '../services/collectionService';
import { createError, checkRequestBody } from '../services/errorService';

const createCollection = async (request: Request, response: Response) => {
  const bodyRequestError = checkRequestBody(request.body, [
    'title',
    'description',
    'topic',
    'ownerId',
  ]);

  if (bodyRequestError) {
    return response
      .status(400)
      .send(createError(400, 'bad request: ' + bodyRequestError));
  }

  const { title, description, topic, ownerId } = request.body;

  try {
    const newCollection = await collectionService.createCollection({
      title,
      description,
      topic,
      ownerId,
    });

    response.json(newCollection);
  } catch (error) {
    return console.log(error);
  }
};

const getCollections = async (_: Request, response: Response) => {
  try {
    const collections = await collectionService.findCollections();

    response.json(collections);
  } catch (error) {
    console.log(error);
  }
};

const getCollectionById = async (request: Request, response: Response) => {
  try {
    const collection = await collectionService.deleteCollectionById(
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
    'ownerId',
  ]);

  if (bodyRequestError) {
    return response
      .status(400)
      .send(createError(400, 'bad request: ' + bodyRequestError));
  }

  const { title, description, topic, ownerId } = request.body;

  try {
    const updatedCollection = await collectionService.updateCollection(
      request.params['collectionId'],
      { title, description, topic, ownerId }
    );

    response.json(updatedCollection);
  } catch (error) {
    console.log(error);
  }
};

const deleteCollection = async (request: Request, response: Response) => {
  try {
    const deletedCollection = await collectionService.deleteCollectionById(
      request.params['collectionId']
    );
    response.json(deletedCollection);
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
