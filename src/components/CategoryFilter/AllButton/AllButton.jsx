import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { changeFilterType } from '../../../redux/actions/filterAction';
import { requestDefault } from '../../../redux/actions/fetchActions';
import { CategoryButtons } from '../styles';

function AllButton({ path, select, selected }) {
  const dispatch = useDispatch();
  function handleClick() {
    select('');
    dispatch(changeFilterType(''));
    dispatch(requestDefault(path));
  }
  return (
    <CategoryButtons
      Selected={ selected === '' }
      data-testid="All-category-filter"
      type="button"
      name="All"
      onClick={ handleClick }
    >
      All
    </CategoryButtons>);
}

AllButton.propTypes = {
  path: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

export default AllButton;
