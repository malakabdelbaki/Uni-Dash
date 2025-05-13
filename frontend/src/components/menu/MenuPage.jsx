import React from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import RestaurantInfo from "./RestaurantInfo";
import MenuList from "./MenuList";
import { useMenu } from "../../hooks/useMenu";
import "./menu.css";
import ReviewsList from "./ReviewsList"


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
        <div className="content-container">
          <div className="menu-section">
            <h2 className="menu-heading">Menu</h2>
            <MenuList menu={menu} />
          </div>
          <div className="reviews-section">
          <ReviewsList restaurantId={restaurantId || "1"} />          
          </div>
        </div>
      </main>
    </div>
  );
};

export default MenuPage; 