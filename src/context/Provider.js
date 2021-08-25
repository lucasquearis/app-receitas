import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [user, setUser] = useState({
    user: {
      email: '',
    },
  });

  const [filter, setFilter] = useState({
    type: '',
    search: '',
    src: '',
  });

  const [recipes, setRecipes] = useState([]);

  const [categories, setCategories] = useState([]);

  const [API, setAPI] = useState('');
  const switchAPI = (searchFilter) => {
    switch (searchFilter.type) {
    case 'ingredient':
      setAPI(`https://www.the${searchFilter.src}db.com/api/json/v1/1/filter.php?i=${searchFilter.search}`);
      break;
    case 'name':
      setAPI(`https://www.the${searchFilter.src}db.com/api/json/v1/1/search.php?s=${searchFilter.search}`);
      break;
    case 'first-letter':
      setAPI(`https://www.the${searchFilter.src}db.com/api/json/v1/1/search.php?f=${searchFilter.search}`);
      break;
    default:
      break;
    }
  };

  const requestCategory = async () => {
    const response = await fetch();
    const result = await response.json();
    setCategories(result);
  };

  const RequestAPI = async () => {
    const response = await fetch(API);
    const result = await response.json();
    setRecipes(result);
  };

  useEffect(() => {
    switchAPI(filter);
  }, [filter, API]);

  const contextValue = {
    user,
    setUser,
    filter,
    setFilter,
    API,
    RequestAPI,
    recipes,
    categories,
    requestCategory,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
