import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getLocalStorage } from '../../utils';
import ToggleButtons from '../ToggleButtons';
import InfoCard from '../InfoCard';

const DoneRecipes = () => {
  const doneRecipes = getLocalStorage('doneRecipes');
  const [recipes, setRecipes] = useState(doneRecipes);
  const filter = useSelector((state) => state.recipes.filter);

  const renderInfoCards = (array) => {
    if (array.length > 0) {
      return (
        array.map((recipe, index) => (
          <InfoCard
            key={ `Recipe ${index}` }
            recipe={ recipe }
            setRecipes={ setRecipes }
            index={ index }
          />
        ))
      );
    }
    return <div>{' '}</div>;
  };

  return (
    <div className="done-recipes">
      <ToggleButtons />
      {
        filter === 'All'
          ? renderInfoCards(recipes)
          : renderInfoCards(
            recipes.filter(({ type }) => type === filter),
          )
      }
    </div>
  );
};

export default DoneRecipes;
