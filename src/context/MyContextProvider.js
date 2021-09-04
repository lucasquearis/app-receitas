import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '.';

export default function Provider({ children }) {
  const [searchBarResult, setSearchBarResult] = useState({});
  const [feed, setFeed] = useState([]);
  const [feedDataFilter, setFeedDataFilter] = useState([]);
  const [search, setSearch] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [resultAPIMeals, setResultAPIMeals] = useState([]);
  const [resultAPIDrinks, setResultAPIDrinks] = useState([]);

  const context = {
    setSearchBarResult,
    searchBarResult,
    feed,
    setFeed,
    feedDataFilter,
    setFeedDataFilter,
    search,
    setSearch,
    selectedIngredient,
    setSelectedIngredient,
    checkedIngredients,
    setCheckedIngredients,
    resultAPIMeals,
    setResultAPIMeals,
    resultAPIDrinks,
    setResultAPIDrinks,
  };

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
