import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { createUserSchemaValidation } from "./userValidation";

const createUser = async (req: Request, res: Response) => {
    try {
  
      const  userData  = req.body;
  
    const zodParsedData = createUserSchemaValidation.parse(userData);
      const result = await UserServices.createUserIntoDB(zodParsedData);
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
 
  const updateSingleUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const  userData  = req.body;

    // const zodParsedData = updateUserSchemaValidation.parse(userData);

      const result = await UserServices.updateSingleUserFromDB(
        userId, 
        // zodParsedData,
        userData,
        );
          res.status(200).json({
          success: true,
          message: 'User updated successfully!',
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
    
  }