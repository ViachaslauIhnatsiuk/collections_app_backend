interface IExtraField {
  _id?: string;
  name: string;
  type: string;
}

interface IUpdateCollection {
  title: string;
  description: string;
  topic: string;
  imageUrl: string;
}

interface ICollection extends IUpdateCollection {
  _id?: string;
  ownerId: string;
  itemExtraFields: IExtraField[];
}

export type { IExtraField, IUpdateCollection, ICollection };
