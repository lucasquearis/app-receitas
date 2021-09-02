import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context/RecipesContext';
import RecipeCard from '../RecipeCard';
import { RecipesWrapper } from './styles';

function RecipeContainer({ page }) {
  const { recipes, tag } = useContext(RecipesContext);
  if (recipes) {
    return (
      <RecipesWrapper>
        {
          recipes.map((e, index) => (<RecipeCard
            key={ e.idDrink ? e.idDrink : e.idMeal }
            recipe={ e }
            index={ index }
            tag={ tag }
            id={ e[`id${tag}`] }
            page={ page }
          />))
        }
      </RecipesWrapper>
    );
  }
  global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  return <div>Bom dia</div>;
}

RecipeContainer.propTypes = {
  page: PropTypes.string.isRequired,
};

export default RecipeContainer;
