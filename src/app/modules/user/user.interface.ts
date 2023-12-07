import { Model } from 'mongoose';
import {} from 'mongoose';

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies:string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  isDeleted: boolean; 
};

//for creating static

export interface DataModel extends Model<User> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<User | null>;
}