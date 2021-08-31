import { ListItem, ListItemText } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';

function List({ primary, testid }) {
  const style = {
    backgroundColor: '',
  };
  return (
    <ListItem style={ style } data-testid={ testid }>
      <ListItemText variant="contained" primary={ primary } />
    </ListItem>
  );
}
List.propTypes = {
  primary: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};

export default List;
