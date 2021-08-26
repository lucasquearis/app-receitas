import React, { useContext } from 'react';
import Context from '../context/Context';
import RecipeCard from './RecipeCard';

function Recipes() {
  const { recipes: { list, loading }, filter: { src } } = useContext(Context);
  console.log(list);
  const mainRecipes = (listToShow) => {
    const maxRecipes = 11;
    const listRecipes = [];
    for (let index = 0; index <= maxRecipes; index += 1) {
      listRecipes.push(listToShow[index]);
    }
    return listRecipes.filter((item) => item !== undefined);
  };
  const showRecipes = (type) => {
    const typeSrc = type === 'cocktail' ? 'drink' : type;
    if (!loading
      && list[`${typeSrc}s`] !== null
      && list[`${typeSrc}s`].length > 1) {
      return (
        <section>
          {mainRecipes(list[`${typeSrc}s`]).map(
            (meal, index) => (
              <RecipeCard item={ meal } index={ index } key={ index } />
            ),
          )}
        </section>
      );
    }
  };
  return (
    <main>
      {showRecipes(src)}
    </main>
  );
}

export default Recipes;
