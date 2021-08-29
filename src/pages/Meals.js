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
  let cards = null;
  if (meals !== null) cards = meals.slice(START_CARD, NUMBER_CARDS);
  if (meals === null) cards = baseDataMeals.meals.slice(START_CARD, NUMBER_CARDS);
  return (
    <div>
      <Header />
      <section className="container-cards">
        {cards.map((meal, index) => (
          <Link key={ index } to={ `/comidas/${meal.idMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ meal.strMealThumb }
                alt={ meal.str }
                data-testid={ `${index}-card-img` }
              />
              <div>
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <FooterMenu />
    </div>
  );
}
