import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { useDataContext } from '../../context/DataProvider';
import HeaderLocation from './HeaderLocation';

export default function ExploreByLocation() {
  const { locationData, loading } = useDataContext();

  const maxLength = 12;
  const locationCards = () => locationData.slice(0, maxLength)
    .map(({ idMeal, strMeal, strMealThumb }, index) => (
      <section
        key={ idMeal }
        data-testid={ `${index}-recipe-card` }
        className="main-cards"
      >
        <Link to={ `/comidas/${idMeal}` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt={ strMeal }
          />
          <h5 data-testid={ `${index}-card-name` }>
            { strMeal }
          </h5>
        </Link>
      </section>
    ));

  return (
    <div>
      <HeaderLocation>Explorar Origem</HeaderLocation>
      { loading && <h1>Carregando...</h1> }
      <div className="main-cards-container">{ locationCards() }</div>
      <Footer />
    </div>
  );
}
