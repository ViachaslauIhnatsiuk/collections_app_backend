import { Response, Request } from 'express';
import * as itemService from '../services/itemService';
import { createError } from '../services/errorService';
import Item from '../models/itemModel';

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
  const { search } = request.query;
  let items;

  if (search) {
    items = await Item.aggregate([
      {
        $search: {
          index: 'items',
          text: {
            query: search,
            path: { wildcard: '*' },
            fuzzy: {},
          },
        },
      },
    ]);
  } else {
    const itemId = request.baseUrl.split('/')[2];
    items = await itemService.findItems({ itemId });
  }

  return response.json(items);
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
