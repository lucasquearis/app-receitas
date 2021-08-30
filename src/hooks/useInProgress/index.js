import { useState, useEffect } from 'react';

function useInProgress() {
  const key = 'inProgressRecipes';
  const [inProgressList, setInProgress] = useState([]);

  useEffect(() => {
    const defaultValue = {
      cocktails: {},
      meals: {},
    };
    const data = JSON.parse(localStorage.getItem(key)) || defaultValue;
    setInProgress(data);
  }, []);

  const handleNewInProgress = (id, ingredient, type) => {
    const prevTypeList = inProgressList[type];
    const typeListIdValue = prevTypeList[id];
    const prevIdIngredientsList = typeListIdValue
      ? { [id]: [...typeListIdValue, ingredient] }
      : { [id]: [ingredient] };

    const ingredientIsInProgress = typeListIdValue ? typeListIdValue.includes(ingredient)
      : false;
    if (ingredientIsInProgress) {
      const value = {
        ...inProgressList,
        [type]: {
          ...prevTypeList,
          [id]: typeListIdValue.filter((item) => item !== ingredient),
        },
      };

      localStorage.setItem(key, JSON.stringify(value));
      setInProgress(value);
    } else {
      const value = {
        ...inProgressList,
        [type]: {
          ...prevTypeList,
          ...prevIdIngredientsList,
        },
      };

      localStorage.setItem(key, JSON.stringify(value));
      setInProgress(value);
    }
  };

  return [inProgressList, handleNewInProgress];
}

export default useInProgress;
