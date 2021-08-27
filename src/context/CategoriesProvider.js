import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { fetchCategories } from '../services';
import { useDataContext } from './DataProvider';

const CategoriesContext = createContext();

export const useCategoriesContext = () => useContext(CategoriesContext);

export default function CategoriesProvider({ children }) {
  const { setData, setLoading } = useDataContext();

  const [selected, setSelected] = useState({
    food: '',
    drinks: '',
  });

  const [applyCategories, setApplyCategories] = useState({
    food: false,
    drinks: false,
  });

  const handleSetSelected = (type, value) => {
    setSelected((prevSelects) => {
      if (prevSelects[type] === value) return { ...prevSelects, [type]: '' };
      return { ...prevSelects, [type]: value };
    });
    setApplyCategories((prevApplies) => ({ ...prevApplies, [type]: true }));
  };

  const handleReset = (type) => {
    setSelected((prevSelects) => ({ ...prevSelects, [type]: '' }));
    setApplyCategories((prevApplies) => ({ ...prevApplies, [type]: true }));
  };

  const getCategoriesData = useCallback(async () => {
    if (applyCategories.food) {
      setLoading(true);
      const { meals } = await fetchCategories('food', selected);
      setLoading(false);
      setData((prevData) => ({ ...prevData, food: meals }));
      setApplyCategories((prevApplies) => ({ ...prevApplies, food: false }));
    }
    if (applyCategories.drinks) {
      setLoading(true);
      const { drinks } = await fetchCategories('drinks', selected);
      setLoading(false);
      setData((prevData) => ({ ...prevData, drinks }));
      setApplyCategories((prevApplies) => ({ ...prevApplies, drinks: false }));
    }
  }, [applyCategories.drinks, applyCategories.food, selected, setData, setLoading]);

  useEffect(() => {
    getCategoriesData();
  }, [getCategoriesData]);

  const contextValue = {
    selected,
    handleSetSelected,
    handleReset,
  };

  return (
    <CategoriesContext.Provider value={ contextValue }>
      { children }
    </CategoriesContext.Provider>
  );
}

CategoriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
