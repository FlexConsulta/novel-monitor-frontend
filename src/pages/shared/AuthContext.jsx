import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../utils/axios";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [authenticateUser, setAuthenticatedUser] = useState();
    const isAuthenticated = !!authenticateUser;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    const handleLogout = () => {
        localStorage.removeItem('jwt-monitor-banco');
        Api.defaults.headers.Authorization = undefined;
        setAuthenticatedUser({});
        navigate('/');
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt-monitor-banco');
        Api.defaults.headers.Authorization = `Bearer ${jwt}`
        setLoading(false);
        if (!authenticateUser?.role && jwt) {
            const { active, profile } = jwt_decode(jwt).data;
            setAuthenticatedUser(state => ({ ...state, jwt, role: profile, active }));
        }
    }, [authenticateUser])

    async function signIn({ email, password }) {
        const response = await Api.post('authenticate', { email, password });
        if (response?.data?.token) {
            Api.defaults.headers.Authorization = `Bearer ${response.data.token}`

            const { active } = jwt_decode(response.data.token).data;

            if (!active) {
                throw new Error('Usuário inativo!');
            }

            localStorage.setItem('jwt-monitor-banco', response.data.token);
            navigate('/dashboard')
        }
    }

    if (loading) {
        return <></>
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, authenticateUser, handleLogout }} >
            {children}
        </AuthContext.Provider>
    )

}