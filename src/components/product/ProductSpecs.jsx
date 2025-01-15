import React from 'react';

import { List, ListItem, ListItemText, Divider } from '@mui/material';
import PropTypes from 'prop-types';

const ProductSpecs = ({ format, polygons, textures }) => (
  <List>
    <ListItem>
      <ListItemText primary="Available Formats" secondary={format.join(', ')} />
    </ListItem>
    <Divider />
    <ListItem>
      <ListItemText primary="Polygons" secondary={polygons} />
    </ListItem>
    <Divider />
    <ListItem>
      <ListItemText primary="Textures" secondary={textures} />
    </ListItem>
  </List>
);

ProductSpecs.propTypes = {
  format: PropTypes.arrayOf(PropTypes.string).isRequired,
  polygons: PropTypes.string.isRequired,
  textures: PropTypes.string.isRequired
};

export { ProductSpecs };
