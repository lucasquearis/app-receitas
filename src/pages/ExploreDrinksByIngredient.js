import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import './pageCSS/ExploreDrinksByIngredient.css';
import fetchIngredients from '../services/Header-SearchBar/Drinks/fetchIngredients';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Loading from '../components/Loading';

export default function ExploreDrinksByIngredient() {
  const [ingredients, setIngredients] = useState([]);
  const max = 12;

  useEffect(() => {
    fetchIngredients().then((response) => {
      setIngredients(response.drinks);
    });
  }, []);

  const cardIngredient = (index, data) => {
    const { strIngredient1 } = data;
    return (
      <div className="explore-ingredients--drinks__card">
        <Link to="/bebidas">
          <div
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
              data-testid={ `${index}-card-img` }
            />
            <h3 data-testid={ `${index}-card-name` }>{ strIngredient1 }</h3>
          </div>
        </Link>
      </div>
    );
  };

  const fillIngredients = () => {
    if (ingredients === 0) return <Loading />;
    return ingredients.slice(0, max)
      .map((ingredient, index) => cardIngredient(index, ingredient));
  };

  if (ingredients) {
    return (
      <>
        <HeaderNoSearch title="Ingredientes" />
        <div className="explore-ingredients--drinks__card-div">
          { fillIngredients() }
        </div>
        <br />
        <BottomMenu />
      </>
    );
  }
  return <Loading />;
}
