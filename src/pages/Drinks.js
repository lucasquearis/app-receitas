import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import myContext from '../context/myContext';
import FooterMenu from '../components/FooterMenu';
import '../styles/Recepts.css';
import { START_CARD, NUMBER_CARDS } from '../services/data';

export default function Foods() {
  const { filteredDrinks, baseDataDrinks } = useContext(myContext);
  if (!filteredDrinks || !baseDataDrinks) return <p>Loading...</p>;
  const { drinks } = filteredDrinks;
  let cards = null;
  console.log('base', baseDataDrinks);
  console.log('fil', filteredDrinks);
  if (drinks !== null) cards = drinks.slice(START_CARD, NUMBER_CARDS);
  if (drinks === null) cards = baseDataDrinks.drinks.slice(START_CARD, NUMBER_CARDS);
  return (
    <div>
      <Header />
      <section className="container-cards">
        {cards.map((drink, i) => (
          <Link key={ i } to={ `/bebidas/${drink.idDrink}` }>
            <div className={ `${drink.idDrink}-recipe-card card` }>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.str }
                className={ `${drink.idDrink}-card-img` }
              />
              <div>
                <p data-testid={ `${drink.idDrink}-card-name` }>{drink.strDrink}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <FooterMenu />
    </div>
  );
}
