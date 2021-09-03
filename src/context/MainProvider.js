import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';

function MainProvider({ children }) {
  const [areas, setAreas] = useState([]);
  const [areaSelected, setAreaSelected] = ('');
  const [ingredient, setIngredient] = useState('');
  const [renderHSB, setRenderHSB] = useState(true);
  const [renderCF, setRenderCF] = useState(true);
  const [renderCD, setRenderCD] = useState(true);
  const [renderIR, setRenderIR] = useState(false);

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
    renderHSB,
    setRenderHSB,
    renderCF,
    setRenderCF,
    renderCD,
    setRenderCD,
    renderIR,
    setRenderIR,
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
