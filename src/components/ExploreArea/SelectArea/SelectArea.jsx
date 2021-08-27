import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function SelectArea({ setArea }) {
  const areaList = useSelector(({ meals }) => meals.areas);

  if (areaList.meals) {
    return (
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ ({ target }) => setArea(target.value) }
      >
        <option data-testid="All-option" value="All">All</option>
        {areaList.meals.map(({ strArea }, i) => (
          <option
            key={ i }
            data-testid={ `${strArea}-option` }
            value={ strArea }
          >
            { strArea }
          </option>))}
      </select>
    );
  }
  return (<p>Loading Areas...</p>);
}

SelectArea.propTypes = {
  setArea: PropTypes.func.isRequired,
};

export default SelectArea;
