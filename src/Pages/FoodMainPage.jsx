import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Footer from '../Components/Footer';
import RecipeCard from '../Components/RecipeCard';
import FoodHeader from '../Components/FoodHeader';
import '../styles/MainPages.css';

function FoodMainPage() {
  const { meals } = useSelector((state) => state.foodcategories);
  const { mealsBar, showBar } = useSelector((state) => state.mainPage);

  if (!meals) {
    return <Spinner animation="border" variant="danger" />;
  }

  if (!showBar) {
    return (
      <div className="container">
        <FoodHeader title="Comidas" />
        <section className="cards">
          { meals.map(({ idMeal, strMealThumb, strMeal }, key) => (
            <RecipeCard
              key={ idMeal }
              id={ idMeal }
              thumbnail={ strMealThumb }
              title={ strMeal }
              index={ key }
            />
          ))}
        </section>
        <Footer />
      </div>
    );
  }
  return (
    <div className="container">
      <FoodHeader title="Comidas" />
      <section className="cards">
        { mealsBar.map((meal) => (
          <RecipeCard
            key={ meal.idMeal }
            id={ meal.idMeal }
            thumbnail={ meal.strMealThumb }
            title={ meal.strMeal }
            index={ meal.key }
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default FoodMainPage;
