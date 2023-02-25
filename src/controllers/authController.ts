const User = require('../models/userModel');
import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

const createToken = (_id: string): string => {
  return jwt.sign({ _id }, process.env.SECRET as string, { expiresIn: '1d' });
};

const signUp = async (request: Request, response: Response): Promise<void> => {
  const { name, email, password } = request.body;

  try {
    const user = await User.signup(name, email, password);
    const token = createToken(user._id);

    const responseUser = {
      _id: user._id,
      token,
      name,
      email,
      isBlocked: user.isBlocked,
      isAdmin: user.isAdmin,
      language: user.language,
      theme: user.theme,
    };

    response.status(200).json(responseUser);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const signIn = async (request: Request, response: Response): Promise<void> => {
  const { email, password } = request.body;

  try {
    const user = await User.signin(email, password);
    const token = createToken(user._id);

    const responseUser = {
      _id: user._id,
      token,
      name: user.name,
      email,
      isBlocked: user.isBlocked,
      isAdmin: user.isAdmin,
      language: user.language,
      theme: user.theme,
    };

    response.status(200).json(responseUser);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

export { signUp, signIn };
