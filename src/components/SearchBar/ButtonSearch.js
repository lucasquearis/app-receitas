import React from 'react';
import PropTypes from 'prop-types';
import Button from '../DefaultComponents/Button';

function ButtonSearch(props) {
  const { handleClick } = props;

  return (
    <Button
      handleClick={ handleClick }
      name="Search"
      testId="exec-search-btn"
    />
  );
}

const { func } = PropTypes;
ButtonSearch.propTypes = {
  handleClick: func.isRequired,
};

export default ButtonSearch;
