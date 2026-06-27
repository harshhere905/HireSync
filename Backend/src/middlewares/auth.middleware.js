import jwt from "jsonwebtoken"
import User from "../models/user.models.js"
import BlackListToken from "../models/blacklist.models.js"

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const isBlacklist = await BlackListToken.findOne({ token })
        if (isBlacklist) {
            return res.status(401).json({
                message: "User is logged out"
            })
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        req.user = user
        next()
    }
    catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}
export {authUser}