import { UserModel } from "../user.model";
import { User } from "./user.interface";




const createUserIntoDB = async (user: User) => {
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error('User already exists!');
  }
    const result = await UserModel.create(user);
    return result;
  };
  
  const getAllUserFromDB = async () => {
    const result = await UserModel.find();
    return result;
  };
  const getSingleUserFromDB = async (userId: string) => {
    const result = await UserModel.findOne({ userId });
    return result;
  };
  const updateSingleUserFromDB = async (userId: string,
    payload: Partial<User>) => {
    
    const result = await UserModel.findOneAndUpdate( { userId }, payload,{
      new: true,
    } );
    return result;
  };
 
  const deleteUserFromDB = async (userId: string) => {
    const result = await UserModel.updateOne({ userId}, {isDeleted: true});
    return result;
  };

  export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteUserFromDB,
   
  };