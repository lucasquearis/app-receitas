import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import HeaderNoSearch from '../components/HeaderNoSearch';
import drinkIcon from '../images/drinkIcon.png';

export default function ExploreDrinks() {
  const [random, setRondam] = useState([]);

  useEffect(() => {
    const resolviRandom = async () => {
      const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const { drinks } = await result.json();
      console.log(drinks);
      setRondam(drinks[0].idDrink);
    };
    resolviRandom();
  }, []);

  return (
    <>
      <HeaderNoSearch title="Explorar" />
      <div className="explore">
        <img src={ drinkIcon } className="explore-drinks__icons" alt="Explore Icon" />
        <div className="explore-drinks__link-button">
          <Link
            data-testid="explore-by-ingredient"
            to="/explorar/bebidas/ingredientes"
          >
            Por ingredientes
          </Link>
        </div>
        <div className="explore-drinks__link-button">
          <Link
            data-testid="explore-surprise"
            to={ `/app-receitas/bebidas/${random}` }
          >
            Surpreenda-me!
          </Link>
        </div>
      </div>
      <BottomMenu />
    </>
  );
}
