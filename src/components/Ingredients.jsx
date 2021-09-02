import React, { useContext } from 'react';
import myContext from '../context/myContext';

function Ingredients() {
  const { lists, recipe } = useContext(myContext);
  return (
    <div>
      <div className="ingredients-container">
        <h3 className="title-ingredients">Ingredients</h3>
        <ul className="list">
          {
            lists.ingredients.map((item, key) => (
              <li
                key={ key }
                data-testid={ `${key}-ingredient-name-and-measure` }
              >
                { `${item} - ${lists.measure[key]}` }
              </li>
            ))
          }
        </ul>
      </div>
      <div className="instructions-container">
        <h3 className="title-instructions">Instruções</h3>
        <p
          data-testid="instructions"
          className="instructions"
        >
          { recipe.strInstructions }
        </p>
      </div>
    </div>
  );
}

export default Ingredients;
