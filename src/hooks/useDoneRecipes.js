import { useCallback, useEffect, useState } from 'react';

const useDoneRecipes = () => {
  const [dones, setDone] = useState([]);
  const [filteredDones, setFiltered] = useState([]);
  const date = new Date();

  const getDone = useCallback(() => {
    const arr = JSON.parse(localStorage.getItem('doneRecipes'));
    if (arr === null) {
      setDone([]);
      return;
    }
    setDone(arr);
  }, []);

  useEffect(() => {
    setFiltered([...dones]);
  }, [dones]);

  useEffect(() => {
    getDone();
  }, [getDone]);

  const filter = (param) => {
    if (param === null) {
      setFiltered([...dones]);
      return;
    }
    setFiltered([...dones.filter((e) => e.type === param)]);
  };

  const newRecipeDone = (details) => {
    const { prefix } = details;
    const recipe = {
      id: details[`id${prefix}`],
      type: prefix === 'Meal' ? 'comida' : 'bebida',
      area: details.strArea || '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic || '',
      name: details[`str${prefix}`],
      image: details[`str${prefix}Thumb`],
      doneDate: date.toLocaleDateString(),
      tags: details.strTags || '',
    };
    let storage = JSON.parse(localStorage.getItem('doneRecipes'));

    if (!storage) {
      storage = [recipe];
      localStorage.setItem('doneRecipes', JSON.stringify(storage));
      getDone();
    } else {
      storage = [...storage, recipe];
      localStorage.setItem('doneRecipes', JSON.stringify(storage));
      getDone();
    }
  };

  return {
    newRecipeDone,
    dones,
    filter,
    filteredDones,
  };
};

export default useDoneRecipes;
