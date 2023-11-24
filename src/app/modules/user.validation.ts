import { z } from 'zod';

const fullNameSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

const addressSchema = z.object({
  street: z.string().min(1, { message: 'Street is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
});

const orderSchema = z.object({
  productName: z.string().min(1, { message: 'Product name is required' }),
  price: z
    .number()
    .min(0, { message: 'Price must be greater than or equal to 0' }),
  quantity: z.number().min(1, { message: 'Quantity must be greater than 0' }),
  // _id: z.boolean(),
});

export const zodValidationUserSchema = z.object({
  userId: z
    .number()
    .int()
    .min(1, { message: 'User ID must be greater than or equal to 1' }),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  fullName: fullNameSchema,
  age: z.number().min(1, { message: 'Age must be greater than or equal to 1' }),
  email: z.string().email({ message: 'Invalid email format' }),
  isActive: z.boolean(),
  hobbies: z.array(
    z.string().min(1, { message: 'At least one hobby is required' }),
  ),
  address: addressSchema,
  orders: z.array(orderSchema).optional(),
});
