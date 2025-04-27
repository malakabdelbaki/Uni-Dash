import React from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import RestaurantInfo from "./RestaurantInfo";
import MenuList from "./MenuList";
import { useMenu } from "../../hooks/useMenu";
import "./menu.css";

const MenuPage = () => {
  const { restaurantId } = useParams();
  const { menu, restaurant, loading, error } = useMenu(restaurantId);

  if (loading) {
    return (
      <div className="menu-container">
        <Header />
        <main className="menu-main">
          <div className="loading">Loading menu...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-container">
        <Header />
        <main className="menu-main">
          <div className="error">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="menu-container">
      <Header />
      <main className="menu-main">
        <RestaurantInfo restaurant={restaurant} />
        <h2 className="menu-heading">Menu</h2>
        <MenuList menu={menu} />
      </main>
    </div>
  );
};

export default MenuPage; 