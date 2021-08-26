import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { fetchAreas } from '../services';
import { useDataContext } from './DataProvider';

const AreaContext = createContext();

export const useAreaContext = () => useContext(AreaContext);

export default function AreaProvider({ children }) {
  const { setLocationData, setLoading } = useDataContext();

  const [selected, setSelected] = useState('');

  const [applyArea, setApplyArea] = useState(false);

  const handleSetSelected = ({ target: { value } }) => {
    setSelected(value);
    setApplyArea(true);
  };

  const handleReset = () => {
    setSelected('');
    setApplyArea(true);
  };

  const getCategoriesData = useCallback(async () => {
    if (applyArea) {
      setLoading(true);
      const { meals } = await fetchAreas(selected);
      setLoading(false);
      setLocationData(meals);
      setApplyArea(false);
    }
  }, [applyArea, selected, setLoading, setLocationData]);

  useEffect(() => {
    getCategoriesData();
  }, [getCategoriesData]);

  const contextValue = {
    selected,
    handleSetSelected,
    handleReset,
  };

  return (
    <AreaContext.Provider value={ contextValue }>
      { children }
    </AreaContext.Provider>
  );
}

AreaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
