import ItemCollection from '../models/collectionModel';
import { ObjectId } from 'mongodb';

const createCollection = async (data: any) => {
  const newCollection = new ItemCollection(data);
  await newCollection.save();

  return newCollection;
};

const findCollectionById = (id: string) => {
  return ItemCollection.findById(new ObjectId(id));
};

const findCollections = () => {
  return ItemCollection.find({});
};

const findCollectionsByUser = async (userId: string) => {
  const collections = await ItemCollection.find({});
  return collections.filter((collection) => collection.ownerId === userId);
};

const updateCollection = async (id: string, data: any) => {
  const collectionId = new ObjectId(id);

  const updatedCollection = await ItemCollection.findByIdAndUpdate(collectionId, data, {
    new: true,
  });

  return updatedCollection;
};

const deleteCollectionById = async (collectionId: string) => {
  const id = new ObjectId(collectionId);
  const deletedCollection = await ItemCollection.findByIdAndDelete(id);

  return deletedCollection;
};

export {
  createCollection,
  findCollectionById,
  findCollections,
  findCollectionsByUser,
  updateCollection,
  deleteCollectionById,
};
