import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import recepieContext from './Context';
import { fetchMeals, fetchDrinks } from '../services/fechRecepies';

export default function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  // const [recepieType, setRecepieType] = useState('');

  useEffect(() => {
    fetchMeals(setMeals);
    fetchDrinks(setDrinks);
  }, []);

  const defaultValue = {
    meals,
    drinks,
  };
  return (
    <recepieContext.Provider value={ defaultValue }>
      {children}
    </recepieContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
