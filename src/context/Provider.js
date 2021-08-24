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
  });

  const [API, setAPI] = useState('');

  const switchAPI = (searchFilter) => {
    switch (searchFilter.type) {
    case 'ingredient':
      setAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchFilter.search}`);
      break;
    case 'name':
      setAPI(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFilter.search}`);
      break;
    case 'first-letter':
      setAPI(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchFilter.search}`);
      break;
    default:
      break;
    }
  };

  const alertFirstLetter = () => {
    const { type, search } = filter;
    if (type === 'first-letter' && search.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      setFilter({ ...filter, search: '' });
    }
  };

  const RequestAPI = async () => {
    const response = await fetch(API);
    const result = await response.json();
    console.log(result);
  };

  useEffect(() => {
    switchAPI(filter);
    alertFirstLetter();
  }, [filter, API]);

  const contextValue = { user, setUser, filter, setFilter, API, RequestAPI };

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
