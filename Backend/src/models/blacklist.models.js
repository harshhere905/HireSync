import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const BlackListToken = mongoose.model(
  "BlackListToken",
  blackListTokenSchema
);

export default BlackListToken;