import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../utils/axios";
import jwt_decode from "jwt-decode";
import { Profiles } from "./Roles";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt-monitor-banco");
    Api.defaults.headers.Authorization = undefined;

    navigate("/");
  };

  async function signIn({ email, password }) {
    const response = await Api.post("authenticate", { email, password });
    if (response?.data?.token) {
      Api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      const { active, profile } = jwt_decode(response.data.token).data;

      if (!active) {
        console.log("Usuário inativo.");
        throw new Error("Usuário inativo!");
      }

      localStorage.setItem("jwt-monitor-banco", response.data.token);

      if (profile === Profiles.administracao) {
        navigate("/dashboard");
      } else {
        navigate("/logs-customer");
      }
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
