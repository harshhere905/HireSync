import express from 'express'
import {
    registerUser,
    verifyEmail,
    resendOtp,
    checkAvailability,
    loginUser,
    logoutUser,
    userDetails
} from '../controllers/auth.controllers.js'
import { authUser } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/verify-email', verifyEmail)
router.post('/resend-otp', resendOtp)
router.post('/check-availability', checkAvailability)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/user', authUser, userDetails)

export default router