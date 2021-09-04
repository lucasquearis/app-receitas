import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import './pageCSS/ExploreDrinks.css';
import HeaderNoSearch from '../components/HeaderNoSearch';

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
      <HeaderNoSearch title="Explorar Bebidas" />
      <div className="explore">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/bebidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-surprise"
          to={ `/bebidas/${random}` }
        >
          Me Surpreenda!
        </Link>
      </div>
      <BottomMenu />
    </>
  );
}
