import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import "./menu.options.style.css";
import MenuItem from "./components/menuItem";

import { MenuContext } from "./MenuContext";
import { getLoggedUserInfo } from "../../utils/profile";

export default function MenuOptionsComponents() {
  const { menuList, setMenuList } = useContext(MenuContext);

  return (
    <>
      <Col
        md={12}
        className="col-2 menu-left h-100"
        style={{ padding: "16px 0px", border: "none" }}
      >
        <div className="user-name-container">
          Olá,<span className="user-name"> {getLoggedUserInfo().name}</span>
        </div>
        <>
          {menuList.map((menuItem, idx) => (
            <MenuItem
              key={idx}
              menuItem={menuItem}
              setMenuList={setMenuList}
              menuList={menuList}
            />
          ))}
        </>
      </Col>
    </>
  );
}
