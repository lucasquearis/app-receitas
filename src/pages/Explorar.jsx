import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../cssPages/Explore.css';

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
      <Header titulo="Explorar" />
      <main>
        <div className="div">
          <Button
            data-testid="explore-food"
            className="btn"
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
            className="btn"
            type="button"
            name="bebidas"
            variant="light"
            size="lg"
            onClick={ onClick }
          >
            Explorar Bebidas
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Explorar;
