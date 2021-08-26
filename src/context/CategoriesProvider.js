import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services';

const CategoriesContext = createContext();

export const useCategoriesContext = () => useContext(CategoriesContext);

export default function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState({
    food: [],
    drinks: [],
  });

  const sendCategories = useCallback(async () => {
    const { meals } = await getCategories('food');
    const { drinks } = await getCategories('drinks');
    setCategories((prevCategories) => ({
      ...prevCategories,
      food: meals,
      drinks,
    }));
  }, []);

  useEffect(() => { sendCategories(); }, [sendCategories]);

  const contextValue = {
    categories,
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
