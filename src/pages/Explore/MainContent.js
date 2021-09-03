import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../style/elements/Button';

function MainContent() {
  return (
    <>
      <Link
        key="explore-food"
        to="/explorar/comidas"
      >
        <Button
          data-testid="explore-food"
          type="button"
          bgColor="#34C95E"
          shadowColor="#2CA64E"
        >
          Explorar Comidas
        </Button>
      </Link>
      <Link
        key="explore-drinks"
        to="/explorar/bebidas"
      >
        <Button
          data-testid="explore-drinks"
          type="button"
          bgColor="#34C95E"
          shadowColor="#2CA64E"
        >
          Explorar Bebidas
        </Button>
      </Link>
    </>
  );
}

export default MainContent;
