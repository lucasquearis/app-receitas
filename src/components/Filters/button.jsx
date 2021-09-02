import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context/RecipesContext';

const quatro = 4;
const Button = ({ name, index, prefix }) => {
  const { getByCategory } = useContext(RecipesContext);
  if (index > quatro) return null;
  return (
    <button
      type="button"
      data-testid={ `${name}-category-filter` }
      onClick={ () => getByCategory(name, prefix) }
    >
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  prefix: PropTypes.string.isRequired,
};

export default Button;
