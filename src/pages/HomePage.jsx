import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Drawer, Button, Spin, Input, Form, Badge ,message } from 'antd';
import ProductCard from '../components/ProductCard';
import { ShoppingCartOutlined } from '@ant-design/icons';

import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [checkoutInfo, setCheckoutInfo] = useState({ name: '', address: '', phoneNumber: '' });
 
  const [userInfo, setUserInfo] = useState(null); // Optional: to display username

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://backend-delta-nine-60.vercel.app/');
        setProducts(response.data);
      } catch (error) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    console.log("Stored User ID:", storedUserId);  // Debugging line

    setUserId(storedUserId);  // Set userId from localStorage

    if (storedUserId) {
      axios.get(`https://backend-delta-nine-60.vercel.app/${storedUserId}`)
        .then(res => {
          setUserInfo(res.data);
        })
        .catch(err => {
          console.error("Failed to fetch user info:", err);
        });
    }
  }, []);  // This effect runs only once after the first render

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCheckout = async (values) => {
    const { name, address, phoneNumber } = values;
    console.log('Checkout Form Data:', values);
    console.log('Cart Items:', cart);

    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

   

    try {
      const response = await axios.post('https://backend-delta-nine-60.vercel.app/', {
        userId,
        name,
        address,
        phoneNumber,
        cartItems: cart.map(item => ({
          productId: item._id,
          quantity: 1,
        })),
      });

      console.log('Order Response:', response.data);
    message.success('Order Placed sucessfully!')
      setCart([]);
      setCheckoutInfo({ name: '', address: '', phoneNumber: '' });
      setDrawerOpen(false);
    } catch (error) {
      console.error("Error during checkout:", error.response || error.message);
      alert('Error during checkout! Please try again later.');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Header section */}
      <div className='header'>
        <h1><em>Jewellery Collection</em></h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {userInfo && <span>Welcome, {userInfo.name}</span>}
          <Button onClick={toggleDrawer}>
            <Badge count={cart.length} size="small" offset={[0, 10]}>
              <ShoppingCartOutlined style={{ fontSize: '20px' }} />
            </Badge>
          </Button>
        </div>
      </div>

      {/* Product listing */}
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      {/* Drawer for Cart */}
      <Drawer
        title="Shopping Cart"
        placement="right"
        onClose={toggleDrawer}
        open={drawerOpen}
        width={400}
      >
        {cart.length > 0 ? (
          <div>
            {cart.map((product) => (
              <div key={product._id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />
                <div style={{ flex: 1 }}>
                  <h4>{product.name}</h4>
                  <p>${product.price}</p>
                </div>
                <button onClick={() => removeFromCart(product._id)} style={{ marginLeft: '10px' }}>
                  Remove
                </button>
              </div>
            ))}
            <h3>Total: ${cart.reduce((total, item) => total + item.price, 0)}</h3>
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}

        {/* Checkout Form */}
        {cart.length > 0 && (
          <div>
            <h3>Checkout</h3>
            <Form
              onFinish={handleCheckout}
              initialValues={checkoutInfo}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: 'Please input your phone number!' },
                  { pattern: /^[0-9]{10,14}$/, message: 'Enter a valid phone number' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button  htmlType="submit" block>
                  Place Order
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default HomePage;
