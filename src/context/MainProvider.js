import React from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';

const value = {
  teste: 1,
};

function MainProvider({ children }) {
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
