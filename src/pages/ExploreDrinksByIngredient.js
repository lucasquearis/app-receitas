import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ExploreMealsByIngredient';
import HeaderNoSearch from '../components/HeaderNoSearch';
import fetchIngredients from '../services/Header-SearchBar/Drinks/fetchIngredients';
import BottomMenu from '../components/BottomMenu';
import Loading from '../components/Loading';

export default function ExploreDrinksByIngredient() {
  const [ingredients, setIngredients] = useState([]);
  const max = 12;

  const cardIngredient = (index, data) => {
    const { strIngredient1 } = data;
    return (
      <Link to="/bebidas">
        <div
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            alt={ strIngredient1 }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
        </div>
      </Link>
    );
  };

  const fillIngredients = () => {
    if (ingredients === 0) return <Loading />;
    return ingredients.slice(0, max)
      .map((ingredient, index) => cardIngredient(index, ingredient));
  };

  useEffect(() => {
    fetchIngredients().then((response) => {
      setIngredients(response.drinks);
    });
  }, []);

  if (ingredients) {
    return (
      <>
        <HeaderNoSearch title="Explorar Ingredientes" />
        { fillIngredients() }
        <BottomMenu />
      </>
    );
  }
  return <Loading />;
}
