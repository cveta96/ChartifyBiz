import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  password: string;
  email: string;
  status: string;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  status: {
    type: String,
    required: true,
  },
});

export default model<IUser>("User", UserSchema);
