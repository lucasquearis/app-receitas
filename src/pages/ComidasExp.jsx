import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../cssPages/Explore.css';
import MyContext from '../context/MyContext';
import fetchFoods from '../fetchs/FetchFood';

function ComidasExp() {
  const { surprise, setSurprise } = useContext(MyContext);
  const [redirect, setRedirect] = useState({
    path: '',
  });

  const getRandomFood = async () => {
    const list = await fetchFoods('food', 'random');
    setSurprise(list);
    console.log(surprise);
  };

  function onClick(event) {
    const { name } = event.target;
    setRedirect({
      path: name,
    });
    if (name === 'surprise') getRandomFood();
  }

  if (redirect.path === 'surprise') {
    return <Redirect to={ `/comidas/${redirect.path}` } />;
  }
  if (redirect.path) return <Redirect to={ `/explorar/comidas/${redirect.path}` } />;
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
