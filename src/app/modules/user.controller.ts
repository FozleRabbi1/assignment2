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
      message: 'User create successfully!',
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

export const usersControler = {
  createUsers,
};
