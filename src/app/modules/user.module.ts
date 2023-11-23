import { Schema, model } from 'mongoose';
import { Taddress, TfullName, Torders, Tuser } from './user.interface';

const userNameSchema = new Schema<TfullName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});

const userAdderssSchema = new Schema<Taddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

const userOrderSchema = new Schema<Torders>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
});

const userSchema = new Schema<Tuser>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: userNameSchema,
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isActive: { type: Boolean, required: [true, 'isActive is required'] },
  hobbies: { type: [String], required: [true, 'Hobbies are required'] },
  address: userAdderssSchema,
  orders: {
    type: [userOrderSchema],
    default: [],
  },
});

const UserData = model<Tuser>('UserData', userSchema);
export default UserData;
