import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const OutlinedButton = ({ children, ...props }) => (
  <Button
    variant="outlined"
    color="primary"
    sx={{
      py: 0.5,
      px: 1,
      minWidth: 'auto',
      textTransform: 'none',
      fontSize: '0.875rem',
      borderRadius: 1,
      '&:hover': {
        backgroundColor: 'rgba(25, 118, 210, 0.04)'
      }
    }}
    {...props}
  >
    {children}
  </Button>
);

OutlinedButton.propTypes = {
  children: PropTypes.node.isRequired
};

export { OutlinedButton };
