import Item from '../models/itemModel';
import { ObjectId } from 'mongodb';

const createItem = async (data: any) => {
  const newItem = new Item(data);
  await newItem.save();

  return newItem;
};

const findItemById = (id: string) => {
  return Item.findById(new ObjectId(id));
};

const findItems = (data: any) => {
  return Item.find(data);
};

const findItemsByUser = async (userId: string) => {
  const items = await Item.find({});
  return items.filter((item) => item.ownerId === userId);
};

const updateItem = async (id: string, data: any) => {
  const itemId = new ObjectId(id);
  const updatedItem = await Item.findByIdAndUpdate(itemId, data, { new: true });

  return updatedItem;
};

const deleteItemById = async (itemId: string) => {
  const id = new ObjectId(itemId);
  const deletedItem = await Item.findByIdAndDelete(id);

  return deletedItem;
};

export {
  createItem,
  findItemById,
  findItems,
  findItemsByUser,
  updateItem,
  deleteItemById,
};
