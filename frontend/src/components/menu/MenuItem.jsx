import React from "react";
import "./menu.css";

const MenuItem = ({ item }) => {
  return (
    <div className="menu-card">
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="menu-image"
        />
      ) : (
        <div className="restaurant-placeholder-logo">
          {item.name}
        </div>
      )}

      <div>
        <h3 className="menu-item-name">{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        <p className="menu-item-price">{item.price} EGP</p>
      </div>
    </div>
  );
};

export default MenuItem; 