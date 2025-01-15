import React from 'react';
const Cart = () => {
  const cartItems = []; // Esto vendrá de un estado global posteriormente

  return (
    <div>
      Are you ready to purchase these?
      <ul>
        {cartItems.map(cartItem => (
          <li key={cartItem}>{cartItem}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
