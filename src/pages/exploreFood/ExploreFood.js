import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../../components/FooterMenu/FooterMenu';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';
import './ExploreFood.css';

const ExploreFood = () => {
  const [randomFood, setRandomFood] = useState('');
  const [turnOn, setTurnOn] = useState(false);

  useEffect(() => {
    const randomFoodAPI = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const require = await fetch(URL);
      const response = await require.json();
      const id = response.meals[0].idMeal;
      setRandomFood(id);
    };
    randomFoodAPI();
  }, [turnOn]);
  return (
    <div>
      <HeaderWithoutSearch>Explorar Comidas</HeaderWithoutSearch>
      <Link to="/explorar/comidas/ingredientes">
        <button
          className="exploreFood-btn"
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          className="exploreFood-btn"
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to={ `/comidas/${randomFood}` }>
        <button
          className="exploreFood-btn"
          onClick={ () => setTurnOn(true) }
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

export default ExploreFood;
