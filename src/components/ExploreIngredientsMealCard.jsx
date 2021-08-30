import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';
import Context from '../context/Context';
import fetchAPI from '../services/fetchAPI';

export default function ExploreIngredientsMealCard({ ingredient, index }) {
  const { setFilterByIngredientsMeals } = useContext(Context);

  const { strIngredient } = ingredient;
  const imgUrl = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;

  const handleClick = async () => {
    const { meals } = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`);
    setFilterByIngredientsMeals(meals);
  };

  return (
    <Link
      to="/comidas"
      onClick={ () => handleClick() }
    >
      <li
        className="recipe-card"
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          alt={ strIngredient }
          src={ imgUrl }
          data-testid={ `${index}-card-img` }
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          { strIngredient }
        </p>
      </li>
    </Link>
  );
}

ExploreIngredientsMealCard.propTypes = {
  ingredient: PropTypes.shape({
    strIngredient: PropTypes.string,
  }),
  index: PropTypes.number,
}.isRequired;
