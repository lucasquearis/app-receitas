import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { changeFilterType } from '../../../redux/actions/filterAction';
import { requestByCategory, requestDefault } from '../../../redux/actions/fetchActions';
import { CategoryButtons } from '../styles';

function CategoryButton({ category, path, selected, select }) {
  const dispatch = useDispatch();

  function handleClick({ target }) {
    const { innerText } = target;
    if (selected === innerText) {
      dispatch(changeFilterType(''));
      dispatch(requestDefault(path));
      select('');
    } else {
      dispatch(changeFilterType(''));
      dispatch(requestByCategory(innerText, path));
      select(innerText);
    }
  }
  return (
    <CategoryButtons
      Selected={ selected === category }
      type="button"
      value={ category }
      data-testid={ `${category}-category-filter` }
      onClick={ handleClick }
    >
      { `${category}` }
    </CategoryButtons>);
}

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
};

export default CategoryButton;
