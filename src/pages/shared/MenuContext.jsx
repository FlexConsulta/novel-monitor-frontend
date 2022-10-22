import React, { createContext, useState, useEffect, useContext } from "react";
import { MdHome, MdLogout, MdSettings } from "react-icons/md";
import {
  FaUserAlt,
  FaUserTie,
  FaServer,
  FaRegFileAlt,
  FaDatabase,
} from "react-icons/fa";
import { AuthContext } from "./AuthContext";

export const MenuContext = createContext({});

export default function MenuProvider({ children }) {
  const { handleLogout } = useContext(AuthContext);

  const defaultMenus = [
    {
      name: "Início",
      link: "/dashboard",
      icon: <MdHome size={16} />,
      selected: false,
    },

    {
      link: "/usuarios-admin",
      name: "Usuários",
      icon: <FaUserTie size={16} />,
      selected: false,
    },
    {
      link: "/empresas",
      name: "Clientes",
      icon: <FaUserAlt size={16} />,
      selected: false,
    },
    {
      link: "/servidores",
      name: "Servidores",
      icon: <FaServer size={16} />,
      selected: false,
    },
    {
      link: "/logs-customer",
      name: "Logs",
      icon: <FaRegFileAlt size={16} />,
      selected: false,
    },
    {
      link: "/banco-dados",
      name: "Banco de Dados",
      icon: <FaDatabase size={16} />,
      selected: false,
    },
    {
      name: "Configurações",
      link: "/configuracoes",
      icon: <MdSettings size={16} />,
      selected: false,
    },
    {
      link: "/",
      name: "Sair",
      icon: <MdLogout size={16} />,
      selected: false,

      handleAction: handleLogout,
    },
  ];

  const [menuList, setMenuList] = useState([...defaultMenus]);

  return (
    <MenuContext.Provider value={{ menuList, setMenuList }}>
      {children}
    </MenuContext.Provider>
  );
}
