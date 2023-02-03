import { Response, Request } from 'express';
import * as itemService from '../services/itemService';
import { createError } from '../services/errorService';

const createItem = async (request: Request, response: Response) => {
  try {
    const newItem = await itemService.createItem({
      ...request.body,
    });

    response.json(newItem);
  } catch (error) {
    console.log(error);
  }
};

const getItems = async (request: Request, response: Response) => {
  const itemId = request.baseUrl.split('/')[2];

  try {
    const items = await itemService.findItems({ itemId });

    response.json(items);
  } catch (error) {
    console.log(error);
  }
};

const getItemById = async (request: Request, response: Response) => {
  try {
    const item = await itemService.findItemById(request.params['itemId']);

    response.json(item);
  } catch (error) {
    return response.status(404).send(createError(404, 'Item not found!'));
  }
};

const updateItem = async (request: Request, response: Response) => {
  try {
    const updatedItem = await itemService.updateItem(request.params['itemId'], {
      ...request.body,
    });

    response.json(updatedItem);
  } catch (error) {
    console.log(error);
  }
};

const deleteItem = async (request: Request, response: Response) => {
  try {
    const deletedItem = await itemService.deleteItemById(request.params['itemId']);

    response.json(deletedItem);
  } catch (error) {
    console.log(error);
  }
};

export { createItem, getItems, getItemById, updateItem, deleteItem };
