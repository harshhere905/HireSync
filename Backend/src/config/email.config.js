import dotenv from 'dotenv/config'

if (!process.env.CLIENT_ID) {
    throw new Error("CLIENT_ID is required")
}
if (!process.env.CLIENT_SECRET) {
    throw new Error("CLIENT_SECRET is required")
}
if (!process.env.REFRESH_TOKEN) {
    throw new Error("REFRESH_TOKEN is required")
}
if (!process.env.EMAIL_USER) {
    throw new Error("EMAIL_USER is required")
}
const config={
    CLIENT_ID:process.env.CLIENT_ID,
    CLIENT_SECRET:process.env.CLIENT_SECRET,
    REFRESH_TOKEN:process.env.REFRESH_TOKEN,
    EMAIL_USER:process.env.EMAIL_USER
}

export default config