interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  isBlocked: boolean;
  isAdmin: boolean;
}

export type { IUser };
