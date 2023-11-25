import { Model } from 'mongoose';

export type TfullName = {
  firstName: string;
  lastName: string;
  // _id: false;
};

export type Taddress = {
  street: string;
  city: string;
  country: string;
  // _id: false;
};

export type Torders = {
  productName: string;
  price: number;
  quantity: number;
  // _id: false;
};

export type Tuser = {
  userId: number;
  username: string;
  password: string;
  fullName: TfullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Taddress;
  orders?: Torders[];
};

export interface UserModel extends Model<Tuser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(studentId: string): Promise<Tuser | null>;
}
