import { Torders, Tuser } from './user.interface';
import UserData from './user.module';

const createUserIntoDB = async (data: Tuser): Promise<Tuser> => {
  if (await UserData.isUserExists(String(data.userId))) {
    throw new Error('user already exists');
  }
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

const getSIngleUser = async (userId: number) => {
  const result = await UserData.findOne({ userId });
  if (result) {
    return result;
  } else {
    throw new Error('user not found');
  }
};

const updateUserData = async (
  userId: number,
  userData: Tuser,
): Promise<Tuser | null> => {
  const result = await UserData.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
  });
  if (result) {
    return result;
  } else {
    throw new Error('user not found');
  }
};

const deleteUser = async (userId: number) => {
  if (await UserData.isUserExists(String(userId))) {
    const result = await UserData.deleteOne({ userId });
    return result;
  } else {
    throw new Error('user not found');
  }
};

const usersOrderData = async (userId: number, orders: Torders) => {
  if (await UserData.isUserExists(String(userId))) {
    const filterdata = await UserData.findOne({ userId });
    if (!filterdata.orders) {
      filterdata.orders = [];
    }
    filterdata?.orders?.push(orders);
    const result = await UserData.findOneAndUpdate({ userId }, filterdata);
    return result;
  } else {
    throw new Error('user not found');
  }
};

const getSIngleUserOrder = async (userId: number) => {
  if (await UserData.isUserExists(String(userId))) {
    const result = await UserData.findOne({ userId }).select({ orders: 1 });
    return result;
  } else {
    throw new Error('user not found');
  }
};

const getTotalPricePerUser = async (userId: number) => {
  if (await UserData.isUserExists(String(userId))) {
    const result = UserData.aggregate([
      { $match: { userId } },
      { $unwind: '$orders' },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },
      { $project: { _id: 0, totalPrice: 1 } },
    ]);

    return result;
  } else {
    throw new Error('user not found');
  }
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
