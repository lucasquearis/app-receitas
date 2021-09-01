import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import profileIcon from '../images/profileIcon.svg';
import AppContext from '../context/AppContext';

const SearchDetailsFood = () => {
  const { randomDrinks, setRandomDrinks } = useContext(AppContext);
  const [turnRandom, setTurnRandom] = useState(false);

  useEffect(() => {
    const fetchRanomDrinks = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const request = await fetch(URL);
      const response = await request.json();
      const id = response.drinks[0].idDrink;
      setRandomDrinks(id);
    };
    fetchRanomDrinks();
  }, [turnRandom, setRandomDrinks]);

  return (
    <div>
      <header>
        <Link to="/perfil">
          <button type="button">
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </button>
        </Link>
        <p data-testid="page-title">Explorar Bebidas</p>
      </header>
      <div className="buttons">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to={ `/bebidas/${randomDrinks}` }>
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
