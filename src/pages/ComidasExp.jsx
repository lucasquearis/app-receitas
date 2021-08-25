import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../cssPages/Explore.css';

function ComidasExp() {
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

  if (redirect.redirect) return <Redirect to={ `/explorar/comidas/${redirect.path}` } />;
  return (
    <div>
      <Header titulo="Explorar Comidas" />
      <main>
        <div className="div2">
          <Button
            data-testid="explore-by-ingredient"
            className="btn2"
            type="button"
            name="ingredientes"
            variant="light"
            size="lg"
            onClick={ onClick }
          >
            Por Ingredientes
          </Button>
          <Button
            data-testid="explore-by-area"
            className="btn2"
            type="button"
            name="area"
            variant="light"
            size="lg"
            onClick={ onClick }
          >
            Por Local de Origem
          </Button>
          <Button
            data-testid="explore-surprise"
            className="btn2"
            type="button"
            name="bebidas"
            variant="light"
            size="lg"
            onClick={ onClick }
          >
            Me Surpreenda!
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ComidasExp;
