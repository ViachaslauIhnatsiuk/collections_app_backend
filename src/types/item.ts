interface IItemComment {
  _id?: string;
  user: string;
  text: string;
  createdAt: number;
}

interface IItem {
  _id?: string;
  title: string;
  tags: string[];
  collectionId: string;
  ownerId: string;
  likes: string[];
  comments: IItemComment[];
  createdAt?: string;
  updatedAt?: string;
  [key: string]: number | string | string[] | boolean | IItemComment[] | undefined;
}

interface IItemUpdate {
  title: string;
  tags: string[];
  [key: string]: number | string | string[] | boolean | IItemComment[] | undefined;
}

export type { IItem, IItemComment, IItemUpdate };
