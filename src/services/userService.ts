const User = require('../models/userModel');
import { ObjectId } from 'mongodb';
import { IUser } from 'user';

const findUserById = (id: string) => {
  return User.findById(new ObjectId(id));
};

const findUsers = () => {
  return User.find({});
};

const findOneUser = (data: IUser) => {
  return User.findOne(data);
};

const updateUserById = async (id: string, data: IUser) => {
  const userId = new ObjectId(id);
  const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

  return updatedUser;
};

const deleteUserById = async (userId: string) => {
  const id = new ObjectId(userId);
  const deletedUser = await User.findByIdAndDelete(id);

  return deletedUser;
};

export { findUserById, findUsers, findOneUser, updateUserById, deleteUserById };
