import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Card, Row, Col, message } from 'antd';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    axios.get('https://backend-delta-nine-60.vercel.app/api/products')
      .then(response => setProducts(response.data))
      .catch(() => message.error('Error fetching products'));
  }, []);

  const handleAddProduct = () => {
    const { name, description, price, image, stock } = newProduct;
    if (!name || !description || !price || !image || !stock) {
      return message.warning('Please fill all fields');
    }

    axios.post('https://backend-delta-nine-60.vercel.app/api/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', description: '', price: '', image: '', stock: '' });
        message.success('Product added successfully');
      })
      .catch(() => message.error('Error adding product'));
  };

  const handleDeleteProduct = (productId) => {
    axios.delete(`https://backend-delta-nine-60.vercel.app/api/products${productId}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== productId));
        message.success('Product deleted');
      })
      .catch(() => message.error('Error deleting product'));
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    const { name, description, price, image, stock } = editingProduct;
    if (!name || !description || !price || !image || !stock) {
      return message.warning('Please fill all fields');
    }

    // Debugging: Log the product ID to ensure it's correct
    console.log('Updating product with ID:', editingProduct._id);

    axios.put(`https://backend-delta-nine-60.vercel.app/api/products${editingProduct._id}`, editingProduct)
      .then(response => {
        // Update the products list with the updated product
        const updatedProducts = products.map(product =>
          product._id === response.data._id ? response.data : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);  // Clear the editing state
        message.success('Product updated successfully');
      })
      .catch(() => message.error('Error updating product'));
  };

  const handleInputChange = (e) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      stock: product.stock
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: 16 }}>Admin Panel</h2>

      <Card title={editingProduct ? 'Edit Product' : 'Add New Product'} style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <Input
              placeholder="Product Name"
              name="name"
              value={editingProduct ? editingProduct.name : newProduct.name}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Input
              placeholder="Description"
              name="description"
              value={editingProduct ? editingProduct.description : newProduct.description}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={editingProduct ? editingProduct.price : newProduct.price}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Input
              placeholder="Image URL"
              name="image"
              value={editingProduct ? editingProduct.image : newProduct.image}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Input
              placeholder="Stock"
              name="stock"
              type="number"
              value={editingProduct ? editingProduct.stock : newProduct.stock}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            {editingProduct ? (
              <Button block onClick={handleUpdateProduct}>
                Update Product
              </Button>
            ) : (
              <Button block onClick={handleAddProduct}>
                Add Product
              </Button>
            )}
          </Col>
        </Row>
      </Card>

      <h3>Existing Products</h3>
      <Row gutter={[16, 16]}>
        {products.map(product => (
          <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
            <Card
              cover={
                <img
                  alt={product.name}
                  src={product.image}
                  style={{ height: 200, objectFit: 'cover' }}
                />
              }
              actions={[
                <Button onClick={() => handleEditProduct(product)}>
                  Edit
                </Button>,
                <Button danger onClick={() => handleDeleteProduct(product._id)}>
                  Delete
                </Button>
              ]}
            >
              <Card.Meta
                title={product.name}
                description={`$${product.price} | Stock: ${product.stock}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminPanel;