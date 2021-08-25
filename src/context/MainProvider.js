import React from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';

function MainProvider({ children }) {
  const value = { number: 4 };

  return (
    <MainContext.Provider value={ value }>
      { children }
    </MainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainProvider;
