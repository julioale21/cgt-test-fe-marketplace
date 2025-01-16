import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import { CartItem } from './CartItem';

const CartItemList = ({ items, onIncrement, onDecrement, onRemove }) => (
  <Stack spacing={2}>
    {items.map((item) => (
      <CartItem
        key={item.id}
        item={item}
        onIncrement={() => onIncrement(item)}
        onDecrement={() => onDecrement(item)}
        onRemove={() => onRemove(item.id)}
      />
    ))}
  </Stack>
);

CartItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export { CartItemList };
