import React from 'react';
import PropTypes from 'prop-types';

function ExploreArea({ data, onChange }) {
  return (
    <select data-testid="explore-by-area-dropdown" onChange={ onChange }>
      <option data-testid="All-option" value="">All</option>
      {
        data.map((area, index) => (
          <option
            key={ index }
            data-testid={ `${area.strArea}-option` }
          >
            { area.strArea }
          </option>))
      }
    </select>
  );
}

ExploreArea.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ExploreArea;
