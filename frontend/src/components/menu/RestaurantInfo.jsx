import React from "react";
import "./menu.css";

const RestaurantInfo = ({ restaurant }) => {
  if (!restaurant) return null;

  return (
    <div className="restaurant-info-box">
      <div className="restaurant-image-wrapper">
        <div className="restaurant-image-circle">
          {restaurant.image ? (
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="restaurant-image"
            />
          ) : (
            <div className="restaurant-placeholder-logo">
              {restaurant.name}
            </div>
          )}
        </div>
      </div>
      <h1 className="restaurant-name">{restaurant.name}</h1>
    </div>
  );
};

export default RestaurantInfo; 