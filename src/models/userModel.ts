import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isBlocked: Boolean,
    isAdmin: Boolean,
    language: String,
    theme: String,
  },
  { versionKey: false }
);

userSchema.statics.signup = async function (
  name: string,
  email: string,
  password: string,
  isBlocked: boolean = false,
  isAdmin: boolean = false,
  language: string = 'EN',
  theme: string = 'light'
) {
  if (!name || !email || !password) {
    throw Error('All fields must be filled');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email is already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    isBlocked,
    isAdmin,
    language,
    theme,
  });

  return user;
};

userSchema.statics.signin = async function (email: string, password: string) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email');
  }

  if (user.isBlocked) {
    throw Error('User is blocked');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = model('User', userSchema);
