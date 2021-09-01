import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Explore.css';

function ExploreDrinks() {
  const [surpriseId, setSurpriseId] = useState(0);

  const surpriseDrinkFetch = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const result = await fetch(URL);
    const resultJSON = await result.json();
    setSurpriseId(resultJSON.drinks[0].idDrink);
  };

  useEffect(() => {
    surpriseDrinkFetch();
  }, []);

  return (
    <div>
      <Header name="Explorar Bebidas" />
      <div className="explore-btn-container">
        <Link to="/explorar/bebidas/ingredientes">
          <Button 
            data-testid="explore-by-ingredient"
            variant="contained"
            color="secondary"
          >
            Por Ingredientes
          </Button>
        </Link>
        <Link to={ `/bebidas/${surpriseId}` }>
          <Button
            data-testid="explore-surprise"
            variant="contained"
            color="secondary"
          >
            Me Surpreenda!
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
