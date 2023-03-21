import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import authService from "../services/auth.service";
import userService from "../services/users.service";
import localStorageService, {
    setTokens
} from "../services/localStorage.service";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function singUp({ email, password, ...rest }) {
        try {
            const data = await authService.register({ email, password });
            setTokens(data);
            await createUser({ id: data.localId, email, ...rest });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует!"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function signIn({ email, password }) {
        try {
            const data = await authService.login({ email, password });
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                switch (message) {
                    case "INVALID_PASSWORD":
                        throw new Error(
                            "Email или пароль введены не корректно."
                        );
                    case "EMAIL_NOT_FOUND":
                        throw new Error(
                            "Email или пароль введены не корректно."
                        );
                    default:
                        throw new Error(
                            "Слишком много попыток входа. Попробуйте позднее."
                        );
                }
            }
        }
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        localStorageService.removeAuthData();
        setUser(null);
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider
            value={{ singUp, currentUser, signIn, isLoading, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
