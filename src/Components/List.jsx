import { ListItem, ListItemText } from '@material-ui/core';

import React from 'react';

function List(props) {
  const style = {
    backgroundColor: 'lightgrey',
  };
  return (
    <ListItem style={ style }>
      <ListItemText { ...props } />
    </ListItem>
  );
}
export default List;
