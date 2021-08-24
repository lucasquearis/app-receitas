import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const NotFoundComponent = () => {
  const history = useHistory();

  return (
    <div className="d-flex mt-4 flex-column align-items-center">
      <h2>Not Found</h2>
      <p>Página não encontrada</p>
      <Button
        size="lg"
        onClick={ () => history.goBack() }
      >
        Voltar
      </Button>
    </div>
  );
};

export default NotFoundComponent;
