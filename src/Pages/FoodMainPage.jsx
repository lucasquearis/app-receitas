import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipeCard from '../Components/RecipeCard';
import CategoryFoodButtons from '../Components/CategoryFoodButtons';
import '../styles/MainPages.css';

function FoodMainPage() {
  const { meals } = useSelector((state) => state.foodcategories);

  const DOZE = 12;

  if (!meals) {
    return <Spinner animation="border" variant="danger" />;
  }

  return (
    <div className="container">
      <Header title="Comidas" loading />
      <CategoryFoodButtons />
      <session className="cards">
        { meals.slice(0, DOZE).map(({ idMeal, strMealThumb, strMeal }, key) => (
          <RecipeCard
            key={ idMeal }
            id={ idMeal }
            thumbnail={ strMealThumb }
            title={ strMeal }
            index={ key }
          />
        ))}
      </session>
      <Footer />
    </div>
  );
}

export default FoodMainPage;
