import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
// import Fetch from '../fetchs/FetchFood';

function Provider({ children }) {
  const context = {};
  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
