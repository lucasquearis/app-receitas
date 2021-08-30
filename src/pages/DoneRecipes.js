// vitals
import React, { useState, useEffect } from 'react';
// components
import Header from '../components/Header';
import Footer from '../components/FooterMenu';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const [doneArray, setDoneArray] = useState();
  const [filterByType, setFilterByType] = useState('');

  const localStorageData = localStorage.getItem('doneRecipes');

  useEffect(() => {
    if (localStorageData) {
      setDoneArray(JSON.parse(localStorageData));
    }
  }, [localStorageData]);

  return (
    <main>
      <Header />
      <div className="filter-buttons">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilterByType('') }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => {
            if (filterByType === 'comida') {
              setFilterByType('');
            } else {
              setFilterByType('comida');
            }
          } }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => {
            if (filterByType === 'bebida') {
              setFilterByType('');
            } else {
              setFilterByType('bebida');
            }
          } }
        >
          Drinks
        </button>
      </div>
      <div className="favorites-container">
        {doneArray ? doneArray
          .filter((item) => item.type.includes(filterByType))
          .map((item, index) => (
            <DoneRecipeCard
              key={ item.id }
              id={ item.id }
              index={ index }
              alcoholicOrNot={ item.alcoholicOrNot }
              area={ item.area }
              category={ item.category }
              image={ item.image }
              name={ item.name }
              type={ item.type }
              doneArray={ doneArray }
              setDoneArray={ setDoneArray }
              doneDate={ item.doneDate }
              tags={ item.tags }
            />

          )) : <h4>Sem receitas feitas.</h4>}
      </div>
      <Footer />

    </main>
  );
}

export default DoneRecipes;
