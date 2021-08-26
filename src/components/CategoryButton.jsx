import React from 'react';
import { Button } from '@material-ui/core';

function CategoryButton(name, key, onClick) {
  return (
    <Button
      color="secondary"
      variant="contained"
      data-testid={ `${name}-category-filter` }
      key={ key }
      onClick={ () => onClick(name.replace(' ', '_')) }
    >
      { name }
    </Button>
  );
}

export default CategoryButton;
