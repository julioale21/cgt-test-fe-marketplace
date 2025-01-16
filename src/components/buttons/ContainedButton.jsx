import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const ContainedButton = ({ children, startIcon, ...props }) => (
  <Button
    variant="contained"
    color="primary"
    startIcon={startIcon}
    sx={{
      py: 0.5,
      px: 2,
      minWidth: 'auto',
      textTransform: 'none',
      fontSize: '0.875rem',
      borderRadius: 5,
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: 'primary.dark'
      }
    }}
    {...props}
  >
    {children}
  </Button>
);

ContainedButton.propTypes = {
  children: PropTypes.node.isRequired,
  startIcon: PropTypes.node
};

export { ContainedButton };
