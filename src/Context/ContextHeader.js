import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ContextHeader = createContext();

function HeaderProvider({ children }) {
  const [products, setProducts] = useState([]);

  const showAlert = (callback, msg) => {
    callback(msg);
  };

  const contextValue = {
    showAlert,
    products,
    setProducts,
  };

  return (
    <ContextHeader.Provider value={ contextValue }>
      {children}
    </ContextHeader.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
