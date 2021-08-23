import React from 'react';
import PropTypes from 'prop-types';

function Provider({ children }) {
  const contextValue = { };

  return (
    <Provider.Context value={ contextValue }>
      {children}
    </Provider.Context>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
