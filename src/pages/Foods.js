import React, { useContext } from 'react';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';
import FoodFilterButton from '../components/FoodFilterButton';
import Context from '../context/Context';

function Foods() {
  const { foodRecipes, foodCategories: { loading } } = useContext(Context);
  const { loading: loadcard } = foodRecipes;
  const { list: recipes } = foodRecipes;

  const cards = [];
  const maxCards = 12;
  for (let index = 0; index < maxCards; index += 1) {
    if (loadcard === false) {
      cards.push(<FoodCard meal={ recipes.meals[index] } index={ index } />);
    }
  }

  const foodPage = (bool) => {
    if (bool === false) {
      return (
        <div>
          <Header title="Comidas" name="meal" search />
          <FoodFilterButton />
          { cards }
        </div>
      );
    }
  };

  return (
    <main>
      { foodPage(loading) }
    </main>
  );
}

export default Foods;
