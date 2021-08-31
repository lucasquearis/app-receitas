import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default function CheckList({
  type,
  ingredient,
  measures,
  checkedItems,
  setCheckedItems,
  index,
  id,
}) {
  const isSaved = () => {
    if (checkedItems.meals[id]) {
      return checkedItems.meals[id].includes(ingredient);
    }
    if (checkedItems.cocktails[id]) {
      return checkedItems.cocktails[id].includes(ingredient);
    }
  };

  const handleToggleCheck = ({ target: { checked } }) => {
    setCheckedItems((prevItems) => {
      const prevIdItems = prevItems.meals[id] || prevItems.cocktails[id] || [];
      if (type === 'food') {
        return (
          (checked && {
            ...prevItems,
            meals: { ...prevItems.meals, [id]: [...prevIdItems, ingredient] },
          }
          ) || {
            ...prevItems,
            meals: {
              ...prevItems.meals,
              [id]: prevItems.meals[id].filter((item) => item !== ingredient),
            },
          }
        );
      }
      return (
        (checked && {
          ...prevItems,
          cocktails: {
            ...prevItems.cocktails,
            [id]: [...prevIdItems, ingredient],
          },
        }
        ) || {
          ...prevItems,
          cocktails: {
            ...prevItems.cocktails,
            [id]: prevItems.cocktails[id].filter((item) => item !== ingredient),
          },
        }
      );
    });
  };

  return (
    <li
      data-testid={ `${index}-ingredient-step` }
      className={ isSaved() ? 'checked-item' : 'unChecked-item' }
    >
      <input type="checkbox" onChange={ handleToggleCheck } checked={ isSaved() } />
      {`${ingredient}-${measures[index]}`}
    </li>
  );
}

CheckList.propTypes = {
  type: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkedItems: PropTypes.shape({
    meals: PropTypes.objectOf(PropTypes.array).isRequired,
    cocktails: PropTypes.objectOf(PropTypes.array).isRequired,
  }).isRequired,
  setCheckedItems: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
