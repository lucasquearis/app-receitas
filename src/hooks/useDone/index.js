import { useState, useEffect } from 'react';

function useDone() {
  const key = 'doneRecipes';

  const [doneList, setDoneList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setDoneList(data);
  }, []);

  const handleNewDoneList = (recipe) => {
    const data = JSON.parse(localStorage.getItem(key));
    const isDone = !!doneList.find((item) => item.id === recipe.id);
    if (isDone) {
      const value = data.filter((item) => item.id !== recipe.id);
      localStorage.setItem(key, JSON.stringify(value));
      setDoneList(value);
    } else {
      const value = data ? [...data, recipe] : [recipe];
      localStorage.setItem(key, JSON.stringify(value));
      setDoneList(value);
    }
  };

  return [doneList, handleNewDoneList];
}

export default useDone;
