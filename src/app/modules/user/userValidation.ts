
import { z } from 'zod';

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const createUserSchemaValidation = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
  isDeleted: z.boolean().optional().default(false),
});
const updateAddressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export const updateUserSchemaValidation = z.object({
  userId: z.number().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  fullName: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }).optional(),
  age: z.number().optional(),
  email: z.string().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: updateAddressSchema.optional(),
  isDeleted: z.boolean().optional().default(false),
});

