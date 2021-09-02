import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';

function MainProvider({ children }) {
  const [areas, setAreas] = useState([]);
  const [areaSelected, setAreaSelected] = ('');
  const [ingredient, setIngredient] = useState('');

  useEffect(() => {
    console.log(ingredient);
  }, [ingredient]);

  const value = {
    areas,
    setAreas,
    areaSelected,
    setAreaSelected,
    ingredient,
    setIngredient,
  };
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
