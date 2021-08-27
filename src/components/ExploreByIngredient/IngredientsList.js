import React from 'react';
import Proptypes from 'prop-types';
import IngredientCard from './IngredientCard';

function IngredientsList(props) {
  const { ingredientsData, database, databaseKey, onClick } = props;

  const renderIngredientsList = () => ingredientsData.map((ingredient, index) => {
    let path = 'comidas';
    let ingredientKey = 'strIngredient1';
    if (databaseKey === 'meals') ingredientKey = 'strIngredient';
    if (databaseKey === 'drinks') path = 'bebidas';
    return (
      <IngredientCard
        key={ index }
        title={ ingredient[ingredientKey] }
        index={ index }
        path={ path }
        onClick={ onClick }
        database={ database }
      />);
  });

  return (
    <ul>
      { renderIngredientsList() }
    </ul>
  );
}

IngredientsList.propTypes = {
  ingredientsData: Proptypes.arrayOf(Proptypes.object).isRequired,
  databaseKey: Proptypes.string.isRequired,
  database: Proptypes.string.isRequired,
  onClick: Proptypes.func.isRequired,
};

export default IngredientsList;
