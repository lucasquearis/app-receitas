import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import HeaderNoSearch from '../components/HeaderNoSearch';
import mealIcon from '../images/mealIcon.png';

export default function ExploreMeals() {
  const [random, setRondam] = useState([]);

  useEffect(() => {
    const resolviRandom = async () => {
      const result = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const { meals } = await result.json();
      setRondam(meals[0].idMeal);
    };
    resolviRandom();
  }, []);

  return (
    <>
      <HeaderNoSearch title="Explorar" />
      <div className="explore">
        <img src={ mealIcon } className="explore-meals__icons" alt="Explore Meal Icon" />
        <div className="explore-meals__link-button">
          <Link
            data-testid="explore-by-ingredient"
            to="/explorar/comidas/ingredientes"
          >
            Por ingredientes
          </Link>
        </div>
        <div className="explore-meals__link-button">
          <Link
            data-testid="explore-by-area"
            to="/explorar/comidas/area"
          >
            Por local de origem
          </Link>
        </div>
        <div className="explore-meals__link-button">
          <Link
            data-testid="explore-surprise"
            to={ `/comidas/${random}` }
          >
            Surpreenda-me!
          </Link>
        </div>
      </div>
      <BottomMenu />
    </>
  );
}
