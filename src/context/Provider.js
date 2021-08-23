import React from 'react';
import PropTypes from 'prop-types';
import Context from '.';

function Provider({ children }) {
  // const contextValue = {
  // };
  return (
    <Context.Provider>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
