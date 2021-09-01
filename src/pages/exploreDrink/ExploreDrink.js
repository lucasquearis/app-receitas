import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../../components/FooterMenu/FooterMenu';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';
import './ExploreDrink.css';

const ExploreDrink = () => {
  const [randomDrink, setRandomDrink] = useState('');
  const [turnDrinkOn, setTurnDrinkOn] = useState(false);

  useEffect(() => {
    const randomDrinkAPI = async () => {
      const API = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const require = await fetch(API);
      const response = await require.json();
      const id = response.drinks[0].idDrink;
      setRandomDrink(id);
    };
    randomDrinkAPI();
  }, [turnDrinkOn]);

  return (
    <div>
      <HeaderWithoutSearch>Explorar Bebidas</HeaderWithoutSearch>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          className="exploreDrink-btn"
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${randomDrink}` }>
        <button
          className="exploreDrink-btn"
          onClick={ () => setTurnDrinkOn(true) }
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <FooterMenu />
    </div>
  );
};

export default ExploreDrink;
