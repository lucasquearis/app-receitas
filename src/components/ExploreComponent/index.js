import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ExploreComponent = () => {
  const history = useHistory();

  return (
    <div>
      <Button
        data-testid="explore-food"
        type="button"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas
      </Button>
      <Button
        data-testid="explore-drinks"
        type="button"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas
      </Button>
    </div>
  );
};

export default ExploreComponent;
