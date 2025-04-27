import React from "react";
import Header from "../Header";
import RestaurantList from "./RestaurantList";
import { useRestaurants } from "../../hooks/useRestaurants";
import "./style.css";

const RestaurantPage = () => {
  const { restaurants, loading, error } = useRestaurants();

  if (loading) {
    return (
      <div className="restaurant-container">
        <Header />
        <main className="restaurant-main">
          <div className="loading">Loading restaurants...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="restaurant-container">
        <Header />
        <main className="restaurant-main">
          <div className="error">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="restaurant-container">
      <Header />
      <main className="restaurant-main">
        <div className="restaurant-banner">
          <h2 className="restaurant-subtitle">Available Restaurants</h2>
        </div>
        <RestaurantList restaurants={restaurants} />
      </main>
    </div>
  );
};

export default RestaurantPage; 