interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  isBlocked: boolean;
  isAdmin: boolean;
  language: string;
  theme: string;
}

export type { IUser };
