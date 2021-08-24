import React from 'react';
import PropTypes from 'prop-types';
import MyContext from '.';

export default function Provider({ children }) {
  return (
    <MyContext.Provider value={ {} }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
