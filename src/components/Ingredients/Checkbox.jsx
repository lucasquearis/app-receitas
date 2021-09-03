import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import UseCheckbox from '../../hook/UseCheckbox';
import { IngredintLi, IngredintItem } from './styles';

function Checkbox({ recipe, type, allChecked }) {
  const { ingredients, measures,
    checkedOptions, handleClick } = UseCheckbox(recipe, type);

  useEffect(() => {
    allChecked(ingredients, checkedOptions);
  }, [allChecked, checkedOptions, ingredients]);

  return (
    <section>
      <h3>Ingredientes</h3>
      <div>
        {ingredients.map((ingredient, index) => {
          const checked = checkedOptions.some((check) => check === ingredient);
          return (
            <IngredintLi key={ index } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                id={ ingredient }
                name={ ingredient }
                onClick={ handleClick }
                defaultChecked={ checked }
              />
              <label htmlFor={ ingredient }>
                <IngredintItem>{`${ingredient} - ${measures[index]}`}</IngredintItem>
              </label>
            </IngredintLi>
          );
        })}
      </div>
    </section>
  );
}

Checkbox.propTypes = {
  recipe: propTypes.shape({
    strIngredient1: propTypes.string,
  }).isRequired,
  type: propTypes.string.isRequired,
  allChecked: propTypes.func.isRequired,
};

export default Checkbox;
