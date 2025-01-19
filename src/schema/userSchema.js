import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
      // for matching vaid email
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Paswored must be at least 6 charator']
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username already exists'],
      minlength: [3, 'Username must be at least 3 charator'],
      match: [/^[a-zA-Z0-9]+$/, 'Username must be alaphanumeric']
    },
    avator: {
      type: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String
    },
    verificationTokenExpiry: {
      type: Date
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function saveUser(next) {
  if (this.isNew) {
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = hashedPassword;
    user.avator = `https://robohash.org/${user.username}`;
    user.verificationToken = uuidv4().substring(0, 10).toUpperCase();
    user.verificationTokenExpiry = Date.now() + 1800000; // 1/2 hour
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
