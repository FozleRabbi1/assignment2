import { Tuser } from './user.interface';
import UserData from './user.module';

const createUserIntoDB = async (data: Tuser) => {
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
  //   const result = await UserData.aggregate([ { $match: { _id: new ObjectI(id) } }]);
  const result = await UserData.findById(userId);
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsers,
  getSIngleUser,
};
