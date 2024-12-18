import mongoose from "mongoose";

const squadSchema = new mongoose.Schema({
  name: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const Squad = mongoose.model("Squad", squadSchema);
