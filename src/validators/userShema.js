import { z } from 'zod';

// user sign up validation schema
export const userSignUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string()
});

// user sign in validation schema
export const userSignInSchema = z.object({
  email: z.string().email(),
  password: z.string()
});
