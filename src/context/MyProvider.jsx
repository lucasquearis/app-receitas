import React from 'react';
import PropTypes from 'prop-types';
import myContext from './MyContext';

function MyProvider({ children }) {
  const context = {
  };

  return (
    <myContext.Provider value={ context }>
      { children }
    </myContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default MyProvider;
