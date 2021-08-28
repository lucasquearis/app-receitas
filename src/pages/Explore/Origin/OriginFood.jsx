import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { fetchListByFilter, fetchRecipeByArea } from '../../../services/API';

const DOZE = 12;
function OriginFood() {
  const [areasApi, setAreasApi] = useState(null);
  const [activeArea, setActiveArea] = useState('American');
  const [redirect, setRedirect] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [recipes, setRecipes] = useState(null);

  function handleClick(e) {
    setSelectedRecipe(e.currentTarget.id);
    setRedirect(true);
  }

  useEffect(() => {
    const fetching = async () => {
      setRecipes(await fetchRecipeByArea(activeArea));
      setAreasApi(await fetchListByFilter('themealdb', 'a'));
    };
    fetching();
  }, [activeArea]);

  if (redirect) return <Redirect to={ `/comidas/${selectedRecipe}` } />;

  return (
    <>
      <Header title="Explorar Origem" renderSearchIcon={ false } />
      <main>
        <label htmlFor="area-dropdown">
          <select
            data-testid="explore-by-area-dropdown"
            id="area-dropdown"
            onChange={ (e) => setActiveArea(e.target.value) }
            value={ activeArea }
          >
            <option data-testid="All-option">All</option>
            {console.log(areasApi)}
            {areasApi && areasApi.meals.map((area) => (
              <option
                data-testid={ `${area.strArea}-option` }
                key={ area.strArea }
                value={ area.strArea }
              >
                { area.strArea }
              </option>
            ))}
          </select>

        </label>
        <div>
          {console.log(recipes)}
          { recipes && (
            recipes.meals.slice(0, DOZE).map((recipe, index) => (
              <button
                data-testid={ `${index}-recipe-card` }
                id={ recipe.idMeal }
                key={ index }
                onClick={ handleClick }
                type="button"
              >
                <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
                <img
                  alt="ingredient"
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                />
              </button>
            )))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default OriginFood;
