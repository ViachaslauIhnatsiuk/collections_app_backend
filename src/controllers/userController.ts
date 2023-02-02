import { Response, Request } from 'express';
import * as userService from '../services/userService';
import { createError, checkRequestBody } from '../services/errorService';

const getUsers = async (request: Request, response: Response) => {
  const ids = request.query.ids as string[];
  const users = await userService.findUsers();

  if (ids) {
    return response.json(users.filter((user: { _id: string }) => ids.includes(user._id)));
  }

  try {
    response.json(users);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (request: Request, response: Response) => {
  try {
    const user = await userService.findUserById(request.params['id']);

    response.json(user);
  } catch (error) {
    return response.status(404).send(createError(404, 'User not found!'));
  }
};

const updateUser = async (request: Request, response: Response) => {
  const id = request.params['id'];

  const bodyRequestError = checkRequestBody(request.body, [
    'name',
    'email',
    'password',
    'isBlocked',
    'isAdmin',
    'language',
    'theme',
  ]);
  if (bodyRequestError) {
    return response
      .status(400)
      .send(createError(400, 'bad request: ' + bodyRequestError));
  }
  const { name, email, password, isBlocked, isAdmin, language, theme } = request.body;

  try {
    const updatedUser = await userService.updateUserById(id, {
      name,
      email,
      password,
      isBlocked,
      isAdmin,
      language,
      theme,
    });

    response.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (request: Request, response: Response) => {
  try {
    const deletedUser = await userService.deleteUserById(request.params.id);

    response.json(deletedUser);
  } catch (error) {
    console.log(error);
  }
};

export { getUsers, getUserById, updateUser, deleteUser };
