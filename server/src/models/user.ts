import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user";

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
  refreshtoken: {
    type: String,
  },
});

export default model<IUser>("User", UserSchema);
