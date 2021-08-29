import React, { useContext } from 'react';
import myContext from '../context/myContext';

export default function Ingredients() {
  const { lists } = useContext(myContext);
  if (!lists) return <p>Loading....</p>;
  return (
    <div className="ingredients-container">
      <h3 className="title-ingrendients">Ingredients</h3>
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
  );
}
