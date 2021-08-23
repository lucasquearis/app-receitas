import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const INITIAL_FILTERS = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

const INITIAL_AVAILABLE_FILTERS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [filteredData, setFilteredData] = useState([]);
  const [availableFilters, setAvailableFilters] = useState(INITIAL_AVAILABLE_FILTERS);
  const contextValue = {
    data,
    setData,
    filters,
    setFilters,
    filteredData,
    setFilteredData,
    availableFilters,
    setAvailableFilters,
  };

  const sortingFunction = (results) => {
    const { order: { column, sort } } = filters;
    if (sort === 'ASC') {
      results = results.sort((a, b) => {
        if (Number.isNaN(+a[column]) || Number.isNaN(+b[column])) {
          return a[column].localeCompare(b[column]);
        }
        return +a[column] - +b[column];
      });
    }
    if (sort === 'DESC') {
      results = results.sort((b, a) => {
        if (Number.isNaN(+a[column]) || Number.isNaN(+b[column])) {
          console.log('NaN');
          return a[column].localeCompare(b[column]);
        }
        console.log('Number');
        return +a[column] - +b[column];
      });
    }
    return results;
  };

  useEffect(() => {
    const applyFilters = (results) => {
      setFilteredData(data);
      const { filterByName: { name }, filterByNumericValues } = filters;

      let filtered = sortingFunction(results);

      filtered = results.filter((result) => result.name.includes(name));

      let filteredAvailable = INITIAL_AVAILABLE_FILTERS;

      filterByNumericValues.forEach((filter) => {
        filteredAvailable = filteredAvailable.filter((available) => {
          const test = filter.column !== available;
          return test;
        });
        if (filter.comparison === 'maior que') {
          filtered = filtered.filter((res) => +res[filter.column] > +filter.value);
        }
        if (filter.comparison === 'menor que') {
          filtered = filtered.filter((res) => +res[filter.column] < +filter.value);
        }
        if (filter.comparison === 'igual a') {
          filtered = filtered.filter((res) => +res[filter.column] === +filter.value);
        }
      });
      setAvailableFilters(filteredAvailable);
      return filtered;
    };
    setFilteredData(applyFilters(data));
  }, [filters, data]);

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((stuff) => stuff.json());
      setData(results);
    };
    getPlanets();
  }, []);

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
