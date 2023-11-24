import { Request, Response } from "express";
import { UserServices } from "./user.service";
import Joi, { number } from 'joi';

const createUser = async (req: Request, res: Response) => {
    try {
      // creating a schema joi validation
  
      // const joiValidationSchema = Joi.object({
      //   id: Joi.string(),
      //   name: {
      //     firstName: Joi.string().max(20).required(),
      //     middleName: Joi.string().max(20),
      //     lastName: Joi.string().max(20).required(),
      //   },
      //   gender: Joi.string().required().valid(['male', 'female', 'other']),
      // })

      const userJoiSchema = Joi.object({
        userId: Joi.number().required(),
        username: Joi.string(),
        password: Joi.string(),
        fullName: Joi.object({
          firstName: Joi.string(),
          lastName: Joi.string(),
        }),
        age: Joi.number(),
        email: Joi.string().email(),
        isActive: Joi.boolean().required(),
        hobbies: Joi.array().items(Joi.string()),
        address: Joi.object({
          street: Joi.string(),
          city: Joi.string(),
          country: Joi.string(),
        }),
        orders: Joi.array().items(
          Joi.object({
            productName: Joi.string(),
            price: Joi.number(),
            quantity: Joi.number(),
          })
        ),
      });
  
      const {data: userData } = req.body;
  
      const {error, value}=userJoiSchema.validate(userData);
      console.log(error, value)
      console.log(userData);
      console.log(req.body);
  
      const result = await UserServices.createUserIntoDB(userData);
      console.log(result);
      res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: err,
      });
  }
  };

  const getAllUsers = async (req: Request, res: Response) => {
    try {
      const result = await UserServices.getAllUserFromDB();
      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: err,
      });
    }
  };

  const getSingleUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      console.log(req.params.userId);
      const result = await UserServices.getSingleUserFromDB(userId);
      res.status(200).json({
        success: true,
        message: 'single student are retrieved successfully',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: err,
      });
    }
  };
  const deleteUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      // console.log(req.params.userId);
      const result = await UserServices.deleteUserFromDB(userId);
      res.status(200).json({
        success: true,
        message: ' delete user successfully',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: err,
      });
    }
  };

  export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    
  }