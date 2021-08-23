import { createContext } from 'react';

const INITIAL_CONTEXT = {
  data: [],
  filters: {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  },
  filteredData: [],
};

const AppContext = createContext(INITIAL_CONTEXT);

export default AppContext;
