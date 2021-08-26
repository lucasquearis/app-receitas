import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { changeFilterType } from '../../../redux/actions/filterAction';
import { requestDefault } from '../../../redux/actions/fetchActions';

function AllButton({ path, select }) {
  const dispatch = useDispatch();
  function handleClick() {
    select('');
    dispatch(changeFilterType(''));
    dispatch(requestDefault(path));
  }
  return (
    <button
      data-testid="All-category-filter"
      type="button"
      name="All"
      onClick={ handleClick }
    >
      All
    </button>);
}

AllButton.propTypes = {
  path: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
};

export default AllButton;
