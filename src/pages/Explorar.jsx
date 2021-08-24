import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';

function Explorar() {
  const [redirect, setRedirect] = useState({
    redirect: false,
    path: '',
  });

  function onClick(event) {
    const { name } = event.target;
    event.preventDefault();
    setRedirect({
      redirect: true,
      path: name,
    });
  }

  if (redirect.redirect) return <Redirect to={ `/explorar/${redirect.path}` } />;
  return (
    <div>
      <Button
        data-testid="explore-food"
        type="button"
        name="comidas"
        variant="light"
        size="lg"
        onClick={ onClick }
      >
        Explorar Comidas
      </Button>
      <Button
        data-testid="explore-food"
        type="button"
        name="bebidas"
        variant="light"
        size="lg"
        onClick={ onClick }
      >
        Explorar Bebidas
      </Button>
      <Footer />
    </div>
  );
}

export default Explorar;
