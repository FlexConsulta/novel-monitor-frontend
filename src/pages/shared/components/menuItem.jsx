import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/menuItem.css";
import Roles from "../Roles.js";
import { getLoggedUserInfo } from "../../../utils/profile.js";

export default function MenuItem(props) {
  const navigate = useNavigate();

  const { menuItem, setMenuList, menuList, handleAction } = props;

  if (
    menuItem.link !== "/" &&
    !Roles.routeAuthorizated(
      menuItem.link.replaceAll("/", ""),
      getLoggedUserInfo().profile
    )
  )
    return <></>;

  const handleRedirectToPage = () => {
    const selectMenu = menuList.map((menu) => {
      if (menu.name === menuItem.name) {
        return { ...menu, selected: true };
      } else return { ...menu, selected: false };
    });

    setMenuList([...selectMenu]);

    if (handleAction) {
      handleAction();
    } else {
      navigate(menuItem.link);
    }
  };

  const styled = menuItem.selected
    ? {
        background: "white",
        color: "#085ed6",
      }
    : {
        background: "#085ed6",
        color: "white",
      };

  return (
    <div className="itemMenu" onClick={handleRedirectToPage} style={styled}>
      {menuItem.icon}
      {menuItem.name}
    </div>
  );
}
