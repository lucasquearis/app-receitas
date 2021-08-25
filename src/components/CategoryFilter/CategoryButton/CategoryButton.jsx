import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { requestByCategory } from '../../../redux/actions/fetchActions';

function CategoryButton({ category, path }) {
  const [selected, setSelected] = useState('false');
  const dispatch = useDispatch();

  function handleClick({ target }) {
    const { value } = target;
    console.log(typeof value);
    dispatch(requestByCategory(value, path));
  }
  return (
    <button
      type="button"
      value={ category }
      data-testid={ `${category}-category-filter` }
      onClick={ handleClick }
    >
      { `${category}` }
    </button>);
}

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryButton;
