import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../cssPages/Explore.css';
import mainFetch from '../fetchs/mainFetch';

function ComidasExp() {
  const [surprise, setSurprise] = useState({ idMeal: '' });
  const [redirect, setRedirect] = useState({
    path: '',
  });

  const getRandomFood = async () => {
    const list = await mainFetch('food', 'random');
    const { meals } = list;
    setSurprise({ idMeal: meals[0].idMeal });
  };

  function onClick(event) {
    const { name } = event.target;
    if (name === 'surprise') getRandomFood();
    else {
      setRedirect({
        path: name,
      });
    }
  }

  if (surprise.idMeal) {
    return <Redirect to={ `/comidas/${surprise.idMeal}` } />;
  }
  if (redirect.path) return <Redirect to={ `/explorar/comidas/${redirect.path}` } />;
  return (
    <div>
      <Header titulo="Explorar Comidas" />
      <main className="pageComida">
        <div className="exploreContainer">
          <Button
            data-testid="explore-by-ingredient"
            className="btnExploreComidas"
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
            className="btnExploreComidas"
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
            className="btnExploreComidas"
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

export default ComidasExp;
