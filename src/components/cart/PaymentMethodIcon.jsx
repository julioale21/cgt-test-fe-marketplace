import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const PaymentMethodIcon = ({ src, alt, size = 60 }) => {
  const validatedSize = Math.max(20, Math.min(size, 200));

  if (!src) {
    console.warn('PaymentMethodIcon: src prop is required for proper rendering');
    return null;
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        height: validatedSize,
        width: validatedSize,
        objectFit: 'contain',
        filter: 'grayscale(100%)',
        opacity: 0.7
      }}
    />
  );
};

PaymentMethodIcon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.number
};

PaymentMethodIcon.defaultProps = {
  size: 60
};

export { PaymentMethodIcon };
