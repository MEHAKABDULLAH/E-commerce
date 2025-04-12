import React from 'react';
import { Card, Button } from 'antd';

const { Meta } = Card;

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <Card
          key={product._id}
          hoverable
          cover={<img alt={product.name} src={product.image} />}
        >
          <Meta title={product.name} description={`$${product.price}`} />
          <Button onClick={() => addToCart(product)} >Add to Cart</Button>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
