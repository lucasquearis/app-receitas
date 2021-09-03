import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipeCard from '../Components/RecipeCard';
import CategoryDrinkButtons from '../Components/CategoryDrinkButtons';
import '../styles/MainPages.css';

function DrinkMainPage() {
  const { drinks } = useSelector((state) => state.drinksReducer);

  if (!drinks) {
    return <Spinner animation="border" variant="danger" />;
  }

  return (
    <div className="container">
      <Header title="Bebidas" loading />
      <CategoryDrinkButtons />
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

export default DrinkMainPage;
