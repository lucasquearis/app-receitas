import React from 'react';
import PropTypes from 'prop-types';

export default function Origins({ origins, value, onChange }) {
  return (
    <div className="w-100 p-3">
      <select
        className="w-100 p-2"
        data-testid="explore-by-area-dropdown"
        value={ value }
        onChange={ (e) => onChange(e.target.value) }
      >
        {
          origins.map(({ strArea }, index) => (
            <option
              key={ index }
              value={ strArea }
              data-testid={ `${strArea}-option` }
            >
              { strArea }
            </option>
          ))
        }
      </select>
    </div>
  );
}

Origins.propTypes = {
  origins: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
