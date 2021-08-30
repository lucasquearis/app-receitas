import React, { useContext } from 'react';
import Header from '../components/Header';
import myContext from '../context/myContext';
import FooterMenu from './FooterMenu';
import '../styles/Recepts.css';
import { START_CARD, NUMBER_CARDS } from '../services/data';

export default function Foods() {
  const { filteredMeals, baseDataMeals } = useContext(myContext);
  if (!filteredMeals || !baseDataMeals) return <p>Loading...</p>;
  const { meals } = filteredMeals;
  let numberOfCards = null;
  if (meals !== null) numberOfCards = meals.slice(START_CARD, NUMBER_CARDS);
  /* if (meals === null) numberOfCards = baseDataMeals.meals.slice(START_CARD, NUMBER_CARDS); */
  return (
    <div>
      <Header />
      <section className="container-cards">
        {numberOfCards.map((meal, i) => (
          <div
            key={ i }
            className={ `${i}-recipe-card` }
            data-testid={ `${i}-recipe-card` }
          >
            <img
              src={ meal.strMealThumb }
              alt={ meal.str }
              className={ `${i}-card-img` }
              data-testid={ `${i}-card-img` }
            />
            <div>
              <p data-testid={ `${i}-card-name` }>{meal.strMeal}</p>
            </div>
          </div>
        ))}
      </section>
      <FooterMenu />
    </div>
  );
}
