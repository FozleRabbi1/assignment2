import { Request, Response } from 'express';
import { userServices } from './user.service';
import { zodValidationUserSchema } from './user.validation';

const createUsers = async (req: Request, res: Response) => {
  try {
    // const { userData } = req.body;
    const validData = zodValidationUserSchema.parse(req?.body);
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
    const result = await userServices.getSIngleUser(parseInt(userId));
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

const updateUserData = async (req: Request, res: Response) => {
  try {
    // const { userData } = req.body;
    const userId = req.params.userId;
    // console.log(userId);
    const result = await userServices.updateUserData(
      parseInt(userId),
      req?.body,
    );
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const result = await userServices.deleteUser(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const usersOrderData = async (req: Request, res: Response) => {
  try {
    // const { orders } = req.body;
    const userId = req.params.userId;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const result = await userServices.usersOrderData(
      parseInt(userId),
      req?.body,
    );
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getSIngleUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSIngleUserOrder(parseInt(userId));
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

const getTotalPricePerUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getTotalPricePerUser(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result[0],
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
  updateUserData,
  deleteUser,
  usersOrderData,
  getSIngleUserOrder,
  getTotalPricePerUser,
};
