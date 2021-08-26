import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '.';

export default function Provider({ children }) {
  const [searchBarResult, setSearchBarResult] = useState({});
  const context = {
    setSearchBarResult,
    searchBarResult,
  };
  return (
    <MyContext.Provider value={ context }>
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
