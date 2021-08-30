import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';
import Context from '../context/Context';
import fetchAPI from '../services/fetchAPI';

export default function ExploreIngredientsDrinkCard({ ingredient, index }) {
  const { setFilterByIngredientsDrinks } = useContext(Context);

  const { strIngredient1 } = ingredient;
  const imgUrl = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;

  const handleClick = async () => {
    const { drinks } = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${strIngredient1}`);
    setFilterByIngredientsDrinks(drinks);
  };

  return (
    <Link
      to="/bebidas"
      onClick={ () => handleClick() }
    >
      <li
        className="recipe-card"
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          alt={ strIngredient1 }
          src={ imgUrl }
          data-testid={ `${index}-card-img` }
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          { strIngredient1 }
        </p>
      </li>
    </Link>
  );
}

ExploreIngredientsDrinkCard.propTypes = {
  ingredient: PropTypes.shape({
    strIngredient: PropTypes.string,
  }),
  index: PropTypes.number,
}.isRequired;
