import React from 'react';
import propTypes from 'prop-types';
import UseCheckbox from '../../hook/UseCheckbox';

function Checkbox({ recipe, type }) {
  const { ingredients, measures,
    checkedOptions, handleClick } = UseCheckbox(recipe, type);

  return (
    <section>
      <h3>Ingredientes</h3>
      <div>
        {ingredients.map((ingredient, index) => {
          const checked = checkedOptions.some((check) => check === ingredient);
          return (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                id={ ingredient }
                name={ ingredient }
                onClick={ handleClick }
                defaultChecked={ checked }
              />
              <label htmlFor={ ingredient }>
                {`${ingredient} - ${measures[index]}`}
              </label>
            </div>
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
};

export default Checkbox;
