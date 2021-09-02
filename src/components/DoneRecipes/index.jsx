import React, { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContext';
import useLocal from '../../hooks/useLocal';
import DoneCard from '../DoneCard';
import DoneFilters from '../DoneFilters';

function DoneRecipes() {
  const { filteredDones,
    history: { location: { pathname } }, filter } = useContext(RecipesContext);
  const { filteredFav, addToFav, filterFav } = useLocal();

  const path = () => (pathname === '/receitas-feitas' ? filteredDones : filteredFav);
  if (filteredDones && filteredFav) {
    return (
      <>
        <DoneFilters filter={ pathname === '/receitas-feitas' ? filter : filterFav } />
        {
          path().map(
            (e, index) => (<DoneCard
              addToFav={ addToFav }
              key={ e.name }
              recipe={ e }
              index={ index }
            />),
          )
        }
      </>
    );
  }
  return <h1>Loading</h1>;
}

export default DoneRecipes;
