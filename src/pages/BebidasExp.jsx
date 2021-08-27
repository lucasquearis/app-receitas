import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../cssPages/Explore.css';
import fetchFoods from '../fetchs/FetchFood';

function BebidasExp() {
  const [surprise, setSurprise] = useState({ idDrink: '' });
  const [redirect, setRedirect] = useState({
    path: '',
  });

  const getRandomDrink = async () => {
    const list = await fetchFoods('drink', 'random');
    console.log(list);
    const { drinks } = list;
    setSurprise({ idDrink: drinks[0].idDrink });
  };

  function onClick(event) {
    const { name } = event.target;
    if (name === 'surprise') getRandomDrink();
    else {
      setRedirect({
        path: name,
      });
    }
  }

  if (surprise.idDrink) {
    return <Redirect to={ `/bebidas/${surprise.idDrink}` } />;
  }
  if (redirect.path) return <Redirect to={ `/explorar/bebidas/${redirect.path}` } />;
  return (
    <div>
      <Header titulo="Explorar Bebidas" />
      <main>
        <div className="div2">
          <Button
            data-testid="explore-by-ingredient"
            className="btn"
            type="button"
            name="ingredientes"
            variant="light"
            size="lg"
            onClick={ onClick }
          >
            Por Ingredientes
          </Button>
          <Button
            data-testid="explore-surprise"
            className="btn"
            type="button"
            name="surprise"
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

export default BebidasExp;
