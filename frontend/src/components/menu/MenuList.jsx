import React from "react";
import MenuItem from "./MenuItem";
import "./menu.css";

const MenuList = ({ menu }) => {
  return (
    <div className="menu-list">
      {menu.map((item) => (
        <MenuItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default MenuList; 