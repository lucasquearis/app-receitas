import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function ButtonsExplore() {
  return (
    <div className="container">
      <Link to="/explorar/comidas">
        <Button
          className="myButton"
          data-testid="explore-food"
          type="button"
        >
          Explorar Comidas
        </Button>
      </Link>
      <Link to="/explorar/bebidas">
        <Button
          className="myButton2"
          data-testid="explore-drinks"
          type="button"
        >
          Explorar Bebidas
        </Button>
      </Link>
    </div>
  );
}

export default ButtonsExplore;
