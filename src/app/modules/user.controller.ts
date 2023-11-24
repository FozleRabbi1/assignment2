import { Request, Response } from 'express';
import { userServices } from './user.service';
import { zodValidationUserSchema } from './user.validation';

const createUsers = async (req: Request, res: Response) => {
  try {
    const { userData } = req.body;
    const validData = zodValidationUserSchema.parse(userData);
    const result = await userServices.createUserIntoDB(validData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'send valid dataa',
      err: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetched',
      err: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSIngleUser(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const usersControler = {
  createUsers,
  getAllUsers,
  getSingleUser,
};
