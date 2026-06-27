import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { register, login, logout } from "../services/auth.api.js";

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true);
            const data = await login({ email, password });
            setUser(data.user);
            return data;
        } catch (error) {
            console.error(error);
            setUser(null);   // important: clear any stale/old user on failed login
            throw error;     // re-throw so the calling component knows it failed
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        try {
            setLoading(true);
            const data = await register({ username, email, password });
            setUser(data.user);
            return data;
        } catch (error) {
            console.error(error);
            setUser(null);
            throw error;     // re-throw so the calling component knows it failed
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
            setUser(null);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
    };
};

export default useAuth;