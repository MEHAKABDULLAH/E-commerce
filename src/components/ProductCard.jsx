import React from 'react';
import { Card, Button } from 'antd';

const { Meta } = Card;

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          alt={product.name}
          src={product.image}
          style={{ height: 200, objectFit: 'cover' }}
        />
      }
    >
      <Meta title={product.name} description={`$${product.price}`} />
      {addToCart && (
        <Button
         
          style={{ marginTop: 10 }}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      )}
    </Card>
  );
};

export default ProductCard;
