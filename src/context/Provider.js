import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [showBar, setShowBar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const contextValue = {
    selectedCategory,
    setSelectedCategory,
    showBar,
    setShowBar,
  };
  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
