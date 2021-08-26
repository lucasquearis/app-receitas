import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ToggleButtons from '../ToggleButtons';
import useLocalStorage from '../../hooks/useLocalStorage';
import InfoCard from '../InfoCard';

const FavoriteRecipes = () => {
  const [favoriteRecipes] = useLocalStorage('favoriteRecipes');
  const [recipes, setRecipes] = useState(favoriteRecipes);
  const filter = useSelector((state) => state.recipes.filter);

  const renderInfoCards = (array) => {
    if (array.length > 0) {
      return (
        array.map((recipe, index) => (
          <InfoCard
            key={ recipe.id }
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
    <div className="w-100">
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

export default FavoriteRecipes;
