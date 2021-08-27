import { useState } from 'react';

const DoneRecipeHook = () => {
  const [doneRecipe, setDoneRecipe] = useState([]);
  const handleDone = ({ feedType, id }) => {
    if (!doneRecipe.some((e) => e === id)) {
      const done = [...doneRecipe, { [feedType]: id }];
      setDoneRecipe(done);
    }
  };

  return {
    handleDone,
    doneRecipe,
  };
};

export default DoneRecipeHook;
