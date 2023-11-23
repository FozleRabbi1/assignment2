import { Tuser } from './user.interface';
import UserData from './user.module';

const createUserIntoDB = async (data: Tuser) => {
  const result = await UserData.create(data);
  return result;
};

export const userServices = {
  createUserIntoDB,
};
