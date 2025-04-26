import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const RestaurantList = ({ restaurants }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/menu/${id}`);
  };

  return (
    <div className="restaurant-grid">
      {restaurants.map((rest) => (
        <div
          key={rest._id}
          onClick={() => handleClick(rest._id)}
          className="restaurant-card"
        >
          <div className="restaurant-image-wrapper">
            <div className="restaurant-image-circle">
              {rest.image ? (
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="restaurant-image"
                />
              ) : (
                <div className="restaurant-placeholder-logo">
                  {rest.name}
                </div>
              )}
            </div>
          </div>
          <div className="restaurant-info">
            <h3>{rest.name}</h3>
            <p>{rest.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList; 