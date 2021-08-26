import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router';
import Header from '../components/Header';
import FooterMenu from './FooterMenu';

function ExplorerDrinks() {
  const [randomDrink, setRandomDrink] = useState();
  const history = useHistory();

  useEffect(() => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const getDrink = async () => {
      const requestDrink = await fetch(URL);
      const { meals } = await requestDrink.json();
      setRandomDrink(meals[0]);
    };
    getDrink();
  }, []);

  const handleClick = () => {
    const drinkDinamic = `/explorar/bebidas/${randomDrink.idMeal}`;
    return <Redirect to={ drinkDinamic } />;
  };
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
        onClick={ () => handleClick() }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
      <FooterMenu />
    </div>
  );
}

export default ExplorerDrinks;
