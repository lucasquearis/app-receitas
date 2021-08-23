import PropTypes from 'prop-types';
import React from 'react';

function Radios({ name, change, tests, values }) {
  return (
    <div onChange={ ({ target }) => change(target) }>
      {values.map((value, i) => (
        <div key={ i }>
          <span>{ `${value.replace(/^./, (str) => str.toUpperCase())} ` }</span>
          <input type="radio" data-testid={ tests[i] } { ...{ name, value } } />
        </div>
      ))}
    </div>
  );
}

Radios.propTypes = {
  change: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  tests: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Radios;
