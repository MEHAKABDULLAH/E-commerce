import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css'; // Import the updated CSS file for styling

const Main = () => {
  return (
    <div className="main-page">
      <div className="content-container">
        <h1 className="main-heading">Welcome to Our Jewellery Store</h1>
        <p className="main-subheading">Discover the finest jewellery collections for every occasion.</p>
        <div className="cta-buttons">
          <Link to="/products">
            <button className="cta-button" >Shop Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
