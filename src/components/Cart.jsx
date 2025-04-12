const Cart = ({ cartItems, removeFromCart }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item._id}
            style={{
              borderBottom: '1px solid #ccc',
              marginBottom: '10px',
              paddingBottom: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                marginRight: '10px',
              }}
            />
            <div style={{ flex: 1 }}>
              <h4>{item.name}</h4>
              <p>${item.price}</p>
            </div>
            <button onClick={() => removeFromCart(item._id)} style={{ marginLeft: '10px' }}>
              Remove
            </button>
          </div>
        ))
      )}
      <h3>Total: ${totalPrice}</h3>
      <button disabled={cartItems.length === 0} style={{ marginTop: '20px' }}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
