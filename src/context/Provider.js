import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchFoods from '../fetchs/FetchFood';

function Provider({ children }) {
  const [name, setName] = useState('');
  const [data, setData] = useState();
  // useEffect(() => {
  //   // fetchFoods('random').then((value) => setData(value));
  // }, []);

  const handleClick = async (action, food) => {
    const result = await fetchFoods(action, food);
    setData(result);
  };

  console.log(name);
  const context = {
    handleClick,
    data,
    setName,
    name,
    setData,
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
