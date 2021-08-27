import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import Header from '../components/Header';
import myContext from '../context/myContext';
import FooterMenu from '../components/FooterMenu';
import '../styles/Recepts.css';
import { START_CARD, NUMBER_CARDS } from '../services/data';

export default function Foods() {
  const { filteredMeals, baseDataMeals } = useContext(myContext);
  if (!filteredMeals || !baseDataMeals) return <p>Loading...</p>;
  const { meals } = filteredMeals;
  let numberOfCards = null;
  if (meals !== null) numberOfCards = meals.slice(START_CARD, NUMBER_CARDS);
  if (meals === null) numberOfCards = baseDataMeals.meals.slice(START_CARD, NUMBER_CARDS);
  return (
    <div>
      <Header />
      <section className="container-cards">
        {numberOfCards.map((meal, i) => (
          <Link key={ i } to={ `/comidas/${meal.idMeal}` }>
            <div className={ `${meal.idMeal}-recipe-card card` }>
              <img
                src={ meal.strMealThumb }
                alt={ meal.str }
                className={ `${meal.idMeal}-card-img` }
              />
              <div>
                <p data-testid={ `${meal.idMeal}-card-name` }>{meal.strMeal}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <FooterMenu />
    </div>
  );
}
