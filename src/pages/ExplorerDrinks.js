import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

function ExplorerDrinks() {
  const [randomDrink, setRandomDrink] = useState();
  const history = useHistory();
  console.log(randomDrink);
  useEffect(() => {
    try {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const getDrink = async () => {
        const requestDrink = await fetch(URL);
        const response = await requestDrink.json();
        setRandomDrink(response.drinks[0].idDrink);
      };
      getDrink();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Header />
      <button
        type="button"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        data-testid="explore-by-ingredient"
      >

        Por Ingredientes
      </button>
      <button
        type="button"
        onClick={ () => history.push(`/bebidas/${randomDrink}`) }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
      <FooterMenu />
    </div>
  );
}

export default ExplorerDrinks;
