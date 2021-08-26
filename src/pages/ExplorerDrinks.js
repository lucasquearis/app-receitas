import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router';
import Header from '../components/Header';
import FooterMenu from './FooterMenu';

function ExplorerDrinks() {
  const [randomDrink, setRandomDrink] = useState();
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const getDrink = async () => {
      const requestDrink = await fetch(URL);
      console.log(requestDrink);
      const { meals } = await requestDrink.json();
      setRandomDrink(meals[0]);
      console.log(meals);
    };
    getDrink();
  }, [redirect]);

  const handleClick = () => {
    const drinkDinamic = `/explorar/bebidas/${randomDrink.idMeal}`;
    // setRedirect(history.push(drinkDinamic));
    console.log(drinkDinamic);
    // getDrink();
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
