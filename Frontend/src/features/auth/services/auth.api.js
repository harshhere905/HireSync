import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    withCredentials: true,
})

const register = async ({ username, email, password }) => {
    try {
        const res = await api.post('/auth/register', {
            username,
            email,
            password,
        })
        return res.data
    } 
    catch (err) {
        console.error(err)
        throw err
    }
}

const login = async ({ email, password }) => {
    try {
        const res = await api.post('/auth/login', { email, password })
        return res.data
    } 
    catch (err) {
        console.error(err)
        throw err
    }
}

const logout = async () => {
    try {
        const res = await api.post('/auth/logout')
        return res.data
    } 
    catch (err) {
        console.error(err)
        throw err
    }
}

const UserDetails = async () => {
    try {
        const res = await api.get('/auth/user')
        return res.data
    } 
    catch (err) {
        console.error(err)
        throw err
    }
}

export {
    register,
    login,
    logout,
    UserDetails
}
