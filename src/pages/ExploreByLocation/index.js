import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import { useDataContext } from '../../context/DataProvider';
import HeaderLocation from './HeaderLocation';

export default function ExploreByLocation() {
  const history = useHistory();
  const { locationData, loading } = useDataContext();

  const maxLength = 12;
  const locationCards = () => locationData.slice(0, maxLength)
    .map(({ idMeal, strMeal, strMealThumb }, index) => (
      <section
        key={ idMeal }
        data-testid={ `${index}-recipe-card` }
      >
        <button
          type="button"
          onClick={ () => history.push(`/comidas/${idMeal}`) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt={ strMeal }
          />
          <h4 data-testid={ `${index}-card-name` }>
            { strMeal }
          </h4>
        </button>
      </section>
    ));

  return (
    <div>
      <HeaderLocation>Explorar Origem</HeaderLocation>
      { loading && <h1>Carregando...</h1> }
      { locationCards() }
      <Footer />
    </div>
  );
}
