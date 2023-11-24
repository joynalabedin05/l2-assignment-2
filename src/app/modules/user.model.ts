import { Schema, model } from 'mongoose';
import { User } from './user/user.interface';
import bcrypt from "bcrypt";
import config from '../config';

const userSchema = new Schema<User>({
    userId: {
        type: Number,
       required: true,
       unique: true,
      },
      username: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
        
      },
      fullName: {
        firstName: {
          type: String,
          
        },
        lastName: {
          type: String,
          
        },
      },
      age: {
        type: Number,
       
      },
      email: {
        type: String,
        unique: true,
        
      },
      isActive: {
        type: Boolean,
        
      },
      hobbies: {
        type: [String],
      },
      address: {
        street: {
          type: String,
          
        },
        city: {
          type: String,
          
        },
        country: {
          type: String,
          
        },
      },
      orders: [
        {
          productName: {
            type: String,
           
          },
          price: {
            type: Number,
            
          },
          quantity: {
            type: Number,
           
          },
        },
      ],
      isDeleted: Boolean,
});

userSchema.pre('save', async function(next){
  // console.log(this);
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
});

userSchema.post('save', function(doc, next){
  doc.password = "";
  next();
});


export const UserModel = model<User>('User', userSchema);
