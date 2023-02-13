import { Response, Request } from 'express';
import * as userService from '../services/userService';
import { createError } from '../services/errorService';

interface IUser {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  isAdmin: boolean;
  language: string;
  theme: string;
}

const getUsers = async (request: Request, response: Response) => {
  const ids = request.query.ids as string[];
  const users = await userService.findUsers();

  const responseUsers = users.map((user: IUser) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    isBlocked: user.isBlocked,
    isAdmin: user.isAdmin,
    language: user.language,
    theme: user.theme,
  }));

  if (ids) {
    return response.json(
      responseUsers.filter((user: { id: string }) => ids.includes(user.id))
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
      id: user._id,
      name: user.name,
      email: user.email,
      isBlocked: user.isBlocked,
      isAdmin: user.isAdmin,
      language: user.language,
      theme: user.theme,
    };

    response.json(responseUser);
  } catch (error) {
    return response.status(404).send(createError(404, 'User not found!'));
  }
};

const updateUser = async (request: Request, response: Response) => {
  const id = request.params['id'];
  const user = await userService.findUserById(id);

  const { name, email, isBlocked, password, isAdmin, language, theme } = request.body;

  try {
    const updatedUser = await userService.updateUserById(id, {
      name,
      email,
      password: password || user.password,
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
