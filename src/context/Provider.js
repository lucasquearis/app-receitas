import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import mainFetch from '../fetchs/mainFetch';

function Provider({ children }) {
  const [name, setName] = useState('');
  const [filterByIng, setFilterByIng] = useState();
  const [data, setData] = useState({
    food: {},
    drink: {},
  });
  const [dataMeals, setDataMeals] = useState();
  const [dataDrinks, setDataDrinks] = useState();
  const [renderFoods, setRenderFoods] = useState(false);
  const [renderDrinks, setRenderDrinks] = useState(false);

  const handleClick = async (type, action, value, callback) => {
    const result = await mainFetch(type, action, value);
    callback(result);
  };

  const context = {
    handleClick,
    data,
    setName,
    name,
    setData,
    filterByIng,
    setFilterByIng,
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
    renderFoods,
    setRenderFoods,
    renderDrinks,
    setRenderDrinks,
  };

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
