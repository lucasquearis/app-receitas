import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';
import ItemCard from '../components/ItemCard';

function Foods() {
  const doze = 12;
  const { search } = useSelector((state) => state.recipes);
  const oneElementDetails = () => {
    if (search.meals.lenght === 1) {
      return <Redirect to={ `/comidas/${search.meals.idMeal}` } />;
    }
  };

  useEffect(() => {
    if (search.meals) {
      oneElementDetails();
    }
  });

  return (
    <div>
      <Header
        brand="Comidas"
        src={ searchIcon }
        alt="search-icon"
        dataId="search-top-btn"
        className="img-search"
      />
      <main>
        { search.meals && search.meals.map((meal, index) => index < doze && (<ItemCard
          title={ meal.strMeal }
          data-testid={ `${index}-recipe-card` }
          thumb={ meal.strMealThumb }
          id={ meal.idMeal }
          index={ index }
          key={ index }
        />)) }
      </main>
    </div>
  );
}

export default Foods;
