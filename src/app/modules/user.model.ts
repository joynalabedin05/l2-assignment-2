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
      isDeleted: {
        type: Boolean,
        default: false,
      },
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

userSchema.pre('find', function( next){
  this.find({isDeleted: {$ne: true}});
  next();
});
userSchema.pre('findOne', function( next){
  this.find({isDeleted: {$ne: true}});
  next();
});

userSchema.pre('aggregate', function( next){
  this.pipeline().unshift({$match: {isDeleted: {$ne: true}}});
  next();
});

userSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
}

export const UserModel = model<User>('User', userSchema);
