import ItemCollection from '../models/collectionModel';
import { ObjectId } from 'mongodb';
import { ICollection, IUpdateCollection } from 'collection';

const createCollection = async (data: ICollection) => {
  const newCollection = new ItemCollection(data);
  await newCollection.save();

  return newCollection;
};

const findCollectionById = (id: string) => {
  return ItemCollection.findById(new ObjectId(id));
};

const findCollections = (data: object) => {
  return ItemCollection.find(data);
};

const findCollectionsByUser = async (userId: string) => {
  const collections = await ItemCollection.find({});
  return collections.filter((collection) => collection.ownerId === userId);
};

const updateCollection = async (id: string, data: IUpdateCollection) => {
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

const deleteCollectionsByIds = async (collectionIds: ObjectId[]) => {
  const deletedCollections = await ItemCollection.deleteMany({
    _id: { $in: collectionIds },
  });

  return deletedCollections;
};

export {
  createCollection,
  findCollectionById,
  findCollections,
  findCollectionsByUser,
  updateCollection,
  deleteCollectionById,
  deleteCollectionsByIds,
};
