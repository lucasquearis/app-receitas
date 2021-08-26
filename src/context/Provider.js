import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchFoods from '../fetchs/FetchFood';

function Provider({ children }) {
  const [name, setName] = useState('');
  const [data, setData] = useState();
  const [filterByIng, setFilterByIng] = useState();

  const handleClick = async (type, action, value, callback) => {
    const result = await fetchFoods(type, action, value);
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
