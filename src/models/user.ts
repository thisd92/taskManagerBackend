import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  birth?: string;
  tel?: string;
  role: "admin" | "user";
  company: string;
  squad: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  birth: { type: String },
  tel: { type: String },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  squad: { type: Schema.Types.ObjectId, ref: "Squad" },
});

export const User = mongoose.model<IUser>("User", userSchema);
