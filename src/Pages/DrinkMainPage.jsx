import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Footer from '../Components/Footer';
import DrinkHeader from '../Components/DrinkHeader';
import RecipeCard from '../Components/RecipeCard';
import '../styles/MainPages.css';

function DrinkMainPage() {
  const { drinks } = useSelector((state) => state.drinksReducer);
  const { drinksBar, showBar } = useSelector((state) => state.mainPage);

  if (!drinks) {
    return <Spinner animation="border" variant="danger" />;
  }

  if (!showBar) {
    return (
      <div className="container">
        <DrinkHeader title="Bebidas" />
        <session className="cards">
          { drinks.map(({ idDrink, strDrinkThumb, strDrink }, key) => (
            <RecipeCard
              key={ idDrink }
              id={ idDrink }
              thumbnail={ strDrinkThumb }
              title={ strDrink }
              index={ key }
            />
          ))}
        </session>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container">
      <DrinkHeader title="Comidas" />
      <section className="cards">
        { drinksBar.map((drink) => (
          <RecipeCard
            key={ drink.idMeal }
            id={ drink.idMeal }
            thumbnail={ drink.strMealThumb }
            title={ drink.strMeal }
            index={ drink.key }
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default DrinkMainPage;
