import User from '../models/user.models.js'
import BlackListToken from '../models/blacklist.models.js'
import OTP from '../models/otp.models.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendEmail from '../services/email.services.js'
import { generateOTP, getOTPhtml, getWelcomeHtml} from '../utils/utils.js'

// ── 1. Check username/email availability ──────────────────────
const checkAvailability = async (req, res) => {
    try {
        const { field, value } = req.body

        if (!field || !value) {
            return res.status(400).json({ message: "field and value are required" })
        }

        if (!['username', 'email'].includes(field)) {
            return res.status(400).json({ message: "Invalid field" })
        }

        const exists = await User.findOne({ [field]: value })

        return res.status(200).json({ available: !exists })
    }
    catch (err) {
        return res.status(500).json({
            message: "Availability check failed",
            error: err.message
        })
    }
}

// ── 2. Register — user banao + OTP bhejo ─────────────────────
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required!!"
            })
        }

        const isExists = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (isExists) {
            return res.status(409).json({
                message: "Username or Email already exists!!"
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hash
        })

        // Purana OTP delete karo agar tha (resend case)
        await OTP.deleteMany({ userId: user._id })

        const otp = generateOTP()
        const otpHash = await bcrypt.hash(otp, 10)

        await OTP.create({
            userId: user._id,
            otpHash,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        })

        try {
            await sendEmail(
                email,
                "🔐 Verify your HireSync account",
                `Hello ${username},\n\nYour OTP for account verification is ${otp}. Valid for 10 minutes.\n\nIf you did not request this, please ignore this email.`,
                getOTPhtml(otp)
            )
        } catch (emailError) {
            await OTP.deleteMany({ userId: user._id })
            await User.deleteOne({ _id: user._id })
            return res.status(500).json({
                message: "Failed to send verification email. Please try again.",
                error: emailError.message
            })
        }

        return res.status(201).json({
            message: "Registration successful. Please verify your email to continue."
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "User cannot be created!!",
            error: err.message
        })
    }
}

// ── 3. Verify Email via OTP ───────────────────────────────────
const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (user.verified) {
            return res.status(400).json({ message: "Email already verified" })
        }

        const otpDoc = await OTP.findOne({ userId: user._id })

        if (!otpDoc) {
            return res.status(404).json({
                message: "OTP not found. Please request a new one."
            })
        }

        if (otpDoc.expiresAt < new Date()) {
            await OTP.deleteOne({ _id: otpDoc._id })
            return res.status(400).json({ message: "OTP expired. Please request a new one." })
        }

        const isOtpCorrect = await bcrypt.compare(otp, otpDoc.otpHash)

        if (!isOtpCorrect) {
            return res.status(401).json({ message: "Invalid OTP. Please try again." })
        }

        user.verified = true
        await user.save()

        await OTP.deleteOne({ _id: otpDoc._id })
        
        user.verified = true
await user.save()

await OTP.deleteOne({ _id: otpDoc._id })
console.log("html:", getWelcomeHtml(user.username)?.slice(0, 100)) // 👈 yahan

    try {
     await sendEmail(
        user.email,
        "🎉 Welcome to HireSync!",
        `Hello ${user.username}, welcome to HireSync!`,
        getWelcomeHtml(user.username)
    )
    } catch (e) {
    console.error("Welcome email failed:", e.message)
    }

return res.status(200).json({
    message: "Email verified successfully. Please login to continue."
})
        return res.status(200).json({
            message: "Email verified successfully. Please login to continue."
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Email verification failed",
            error: err.message
        })
    }
}

// ── 4. Resend OTP ─────────────────────────────────────────────
const resendOtp = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (user.verified) {
            return res.status(400).json({ message: "Email already verified" })
        }

        await OTP.deleteMany({ userId: user._id })

        const otp = generateOTP()
        const otpHash = await bcrypt.hash(otp, 10)

        await OTP.create({
            userId: user._id,
            otpHash,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        })

        await sendEmail(
            email,
            "🔐 Your new HireSync OTP",
            `Your new OTP is ${otp}. Valid for 10 minutes.`,
            getOTPhtml(otp)
        )

        return res.status(200).json({ message: "OTP resent successfully" })
    }
    catch (err) {
        return res.status(500).json({
            message: "Failed to resend OTP",
            error: err.message
        })
    }
}

// ── 5. Login ──────────────────────────────────────────────────
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required for login!!"
            })
        }

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(401).json({ message: "User not registered!!" })
        }

        // Email verified check
        if (!user.verified) {
            return res.status(403).json({
                message: "Please verify your email before logging in."
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Email or Password is incorrect!!" })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, {
         httpOnly: true,
         sameSite: "none",  // cross-domain ke liye
         secure: true,       // https ke liye
         maxAge: 1 * 24 * 60 * 60 * 1000
        })

        user.password = undefined

        return res.status(200).json({
            message: "User Logged In successfully!!",
            user
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Failed To Login!!",
            error: err.message
        })
    }
}

// ── 6. Logout ─────────────────────────────────────────────────
const logoutUser = async (req, res) => {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(401).json({ message: "Token does not exist" })
        }

        await BlackListToken.create({ token })
        res.clearCookie("token")

        return res.status(200).json({ message: "User Logged Out Successfully" })
    }
    catch (err) {
        return res.status(500).json({
            message: "Failed To Logout!!",
            error: err.message
        })
    }
}

// ── 7. User Details ───────────────────────────────────────────
const userDetails = async (req, res) => {
    return res.status(200).json({
        message: "User details fetched successfully",
        user: req.user
    })
}

export {
    registerUser,
    verifyEmail,
    resendOtp,
    checkAvailability,
    loginUser,
    logoutUser,
    userDetails
}