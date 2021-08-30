import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';

function MainProvider({ children }) {
  const [title, setTitle] = useState('');
  const value = {
    title,
    setTitle,
  };
<<<<<<< HEAD
=======

  const value = { number: 4 };
>>>>>>> 2729d5f85e620986b905c793f7bf49cc7d96412a
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
