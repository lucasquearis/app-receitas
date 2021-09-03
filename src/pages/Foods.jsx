import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { func, number, string, objectOf, oneOfType, object } from 'prop-types';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';
import CategoryFoodButtons from '../components/CategoryFoodButtons';

function Foods(props) {
  const doze = 12;
  const { history } = props;
  const { search } = useSelector((state) => state.recipes);
  const oneElementDetails = () => {
    if (search.meals.length === 1) {
      history.push(`/comidas/${search.meals[0].idMeal}`);
    }
  };

  useEffect(() => {
    if (search.meals === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
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

      <CategoryFoodButtons />
      <main className="food-cards">
        { search.meals && search.meals.map((meal, index) => index < doze && (<ItemCard
          title={ meal.strMeal }
          data-testid={ `${index}-recipe-card` }
          thumb={ meal.strMealThumb }
          id={ meal.idMeal }
          index={ index }
          key={ index }
          to={ `comidas/${meal.idMeal}` }
        />)) }
      </main>
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  history: objectOf(oneOfType([func, string, number, object])),
}.isRequired;

export default Foods;
