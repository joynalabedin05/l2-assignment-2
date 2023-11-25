import { Request, Response } from "express";
import { UserServices } from "./user.service";
import Joi from 'joi';

const createUser = async (req: Request, res: Response) => {
    try {

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
        isDeleted: Joi.boolean(),
      });
  
      const {data: userData } = req.body;
  
      const {error, value}=userJoiSchema.validate(userData);
      console.log(error, value)
      // console.log(userData);
      // console.log(req.body);
  
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
    })
  };
  };

  const getSingleUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      console.log(req.params.userId);
      const result = await UserServices.getSingleUserFromDB(userId);
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          "code": 404,
          "description": "User not found!"
      },
      });
    }
  };
  const updateSingleOrder = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { orders } = req.body;
      console.log(req.params.userId);

      const result = await UserServices.updateSingleOrderFromDB(userId);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          data: null
        });
      }

      result.orders.push({
        productName: orders.productName,
        price: orders.price,
        quantity: orders.quantity,
      });

      await result.save();

      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
      
      }
     catch (err) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: err,
      });
    }
  };
  const updateSingleUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      console.log(req.params.userId);

      const result = await UserServices.updateSingleUserFromDB(userId);
          res.status(404).json({
          success: false,
          message: 'User not found!',
          data: result,
        });
      
      }
     catch (err) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          "code": 404,
          "description": "User not found!"
      },
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
        message: 'User deleted successfully!',
        data: result,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          "code": 404,
          "description": "User not found!"
      },
      });
    }
  };
  
  
  export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser,
    updateSingleOrder,
    
  }