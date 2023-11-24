import { Torders, Tuser } from './user.interface';
import UserData from './user.module';

const createUserIntoDB = async (data: Tuser): Promise<Tuser> => {
  const result = await UserData.create(data);
  return result;
};

const getAllUsers = async () => {
  const result = await UserData.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

const getSIngleUser = async (userId: string | number) => {
  const result = await UserData.findById(userId);
  return result;
};

const updateUserData = async (
  id: string,
  userData: Tuser,
): Promise<Tuser | null> => {
  const result = await UserData.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUser = async (userId: string): Promise<Tuser | null> => {
  const result = await UserData.findByIdAndDelete(userId);
  return result;
};

const usersOrderData = async (id: string, orders: Torders) => {
  const filterdata = await UserData.findById(id);
  if (!filterdata.orders) {
    filterdata.orders = [];
  }
  filterdata?.orders?.push(orders);
  const result = await UserData.findByIdAndUpdate(id, filterdata);
  return result;
};

const getSIngleUserOrder = async (id: string | number) => {
  const result = await UserData.findById(id).select({ orders: 1 });
  return result;
};

const getTotalPricePerUser = async (id: string | number) => {
  const orderData = await UserData.findById(id).select({ orders: 1 });
  let totalAmount = 0;
  orderData?.orders.map(
    (data) => (totalAmount = totalAmount + data.price * data.quantity),
  );
  return totalAmount;
};

export const userServices = {
  createUserIntoDB,
  getAllUsers,
  getSIngleUser,
  updateUserData,
  deleteUser,
  usersOrderData,
  getSIngleUserOrder,
  getTotalPricePerUser,
};
