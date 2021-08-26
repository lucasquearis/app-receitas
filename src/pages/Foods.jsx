import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { func, number, string, objectOf, oneOfType, object } from 'prop-types';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';
import ItemCard from '../components/ItemCard';
import Footer from '../components/Footer';
import FoodsCard from '../components/FoodsCard';
import CategoryButtons from '../components/CategoryButtons';
import '../styles/Footer.css';

function Foods(props) {
  const { history } = props;
  const doze = 12;
  const { search } = useSelector((state) => state.recipes);
  const oneElementDetails = () => {
    if (search.meals.length === 1) {
      console.log('aqui');
      history.push(`/comidas/${search.meals[0].idMeal}`);
    }
  };

  useEffect(() => {
    if (search.meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
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
      <CategoryButtons />

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
      <FoodsCard />

      <Footer />
    </div>
  );
}

Foods.propTypes = {
  history: objectOf(oneOfType([func, string, number, object])),
}.isRequired;

export default Foods;
