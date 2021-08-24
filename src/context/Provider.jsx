import PropTypes from 'prop-types';
import React from 'react';
import Context from './Context';

export default function Provider({ children }) {
  return (
    <Context.Provider>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
