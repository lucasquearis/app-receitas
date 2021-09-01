import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import profileIcon from '../images/profileIcon.svg';
import AppContext from '../context/AppContext';

const SearchDetailsFood = () => {
  const { randomMeal, setRandomMeal } = useContext(AppContext);
  const [turnRandom, setTurnRandom] = useState(false);

  useEffect(() => {
    const fetchRandom = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const request = await fetch(URL);
      const response = await request.json();
      const id = response.meals[0].idMeal;
      setRandomMeal(id);
    };
    fetchRandom();
  }, [turnRandom, setRandomMeal]);

  return (
    <div>
      <header>
        <Link to="/perfil">
          <button type="button">
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </button>
        </Link>
      </header>
      <p data-testid="page-title">Explorar Comidas</p>
      <div className="buttons">
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
        </Link>
        <Link to={ `/comidas/${randomMeal}` }>
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ () => setTurnRandom(true) }
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <FooterMenu />
    </div>
  );
};

export default SearchDetailsFood;
