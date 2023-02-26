import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import * as userService from '../services/userService';
import * as collectionService from '../services/collectionService';
import * as itemService from '../services/itemService';
import { createError } from '../services/errorService';
import { IUser } from 'user';

const getUsers = async (request: Request, response: Response) => {
  const ids = request.query.ids as string[];
  const users = await userService.findUsers();

  const responseUsers = users.map((user: IUser) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    isBlocked: user.isBlocked,
    isAdmin: user.isAdmin,
  }));

  if (ids) {
    return response.json(
      responseUsers.filter((user: { _id: string }) => ids.includes(user._id))
    );
  }

  try {
    response.json(responseUsers);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (request: Request, response: Response) => {
  try {
    const user = await userService.findUserById(request.params['id']);

    const responseUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isBlocked: user.isBlocked,
      isAdmin: user.isAdmin,
    };

    response.json(responseUser);
  } catch (error) {
    return response.status(404).send(createError(404, 'User not found!'));
  }
};

const updateUser = async (request: Request, response: Response) => {
  const id = request.params['id'];
  const user = await userService.findUserById(id);

  const { name, email, isBlocked, password, isAdmin } = request.body;

  try {
    const updatedUser = await userService.updateUserById(id, {
      name,
      email,
      password: password || user.password,
      isBlocked,
      isAdmin,
    });

    response.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (request: Request, response: Response) => {
  try {
    const userId = request.params.id;
    const deletedUser = await userService.deleteUserById(userId);

    const userCollections = await collectionService.findCollections({
      ownerId: { $in: [new ObjectId(userId)] },
    });
    const userItems = await itemService.findItems({
      ownerId: { $in: [new ObjectId(userId)] },
    });

    const userCollectionsIds = userCollections.map(({ _id }) => _id);
    const userItemsIds = userItems.map(({ _id }) => _id);

    const deletedCollections = await collectionService.deleteCollectionsByIds(
      userCollectionsIds
    );
    const deletedItems = await itemService.deleteItemsByIds(userItemsIds);

    response.json([deletedUser, deletedCollections, deletedItems]);
  } catch (error) {
    console.log(error);
  }
};

export { getUsers, getUserById, updateUser, deleteUser };
