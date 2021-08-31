import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DoneCard from '../components/DoneCard';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

function RecipesMade(props) {
  const [madeRecipes, setDoneRecipes] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const { history } = props;
  const { pathname } = history.location;

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    setDoneList(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  const handleAllClick = () => {
    setDoneList(madeRecipes);
  };

  const handleFoodClick = () => {
    setDoneList(madeRecipes.filter((recipe) => recipe.type === 'comidas'));
  };

  const handleDrinkClick = () => {
    setDoneList(madeRecipes.filter((recipe) => recipe.type === 'bebidas'));
  };

  const renderFilterButtons = () => (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleAllClick() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleFoodClick() }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleDrinkClick() }
      >
        Drinks
      </button>
    </div>
  );

  const renderDoneCards = () => (
    <div>
      <ul>
        {doneList.map((recipe, index) => (
          <li key={ recipe.id }>
            <DoneCard
              title={ recipe.strMeal }
              thumb={ recipe.strMealThumb }
              index={ index }
              area={ recipe.strArea }
              alcoholicOrNot={ recipe.strAlcoholic }
              category={ recipe.strCategory }
            />
            <span
              data-testid={ `${index}-horizontal-done-date` }
            >
              { `Feito em: ${recipe.doneDate}` }
            </span>
            {recipe.tags.map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag[0] - tag[1]}
              </span>
            ))}
            <ShareButton
              index={ index }
              pathname={ pathname }
            />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <Header brand="Receitas Feitas" />
      {renderFilterButtons()}
      {doneList && renderDoneCards()}
    </div>
  );
}

RecipesMade.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipesMade;
