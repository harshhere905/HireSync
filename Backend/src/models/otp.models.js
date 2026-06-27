import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        otpHash: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const OTP = mongoose.model("OTP", otpSchema)
export default OTP