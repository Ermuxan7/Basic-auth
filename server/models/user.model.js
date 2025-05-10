import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 100,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
