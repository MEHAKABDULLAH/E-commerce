import React from 'react';
import ProductList from '../components/ProductList';

const UserPage = ({ products, addToCart }) => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

export default UserPage;
