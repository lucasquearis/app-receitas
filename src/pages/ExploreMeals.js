import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import './pageCSS/ExploreMeals.css';
import HeaderNoSearch from '../components/HeaderNoSearch';

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
      <HeaderNoSearch title="Explorar Comidas" />
      <div className="explore">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
        >
          Por Local de Origem
        </Link>
        <Link
          data-testid="explore-surprise"
          to={ `/comidas/${random}` }
        >
          Me Surpreenda!
        </Link>
      </div>
      <BottomMenu />
    </>
  );
}
