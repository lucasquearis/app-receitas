import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Context from '../../../context';

const DOZE = 12;
function OriginFood() {
  const history = useHistory();
  const { setActiveArea, activeArea, areasApi, recipes } = useContext(Context);

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
            <option data-testid="All-option" value="All">All</option>
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
          { recipes === null || recipes.recipe === null
            ? <p>Carregando</p>
            : recipes.meals.slice(0, DOZE).map((recipe, index) => (
              <button
                data-testid={ `${index}-recipe-card` }
                id={ recipe.idMeal }
                key={ index }
                onClick={ () => history.push(`/comidas/${recipe.idMeal}`) }
                type="button"
              >
                <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
                <img
                  alt="ingredient"
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                />
              </button>
            ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default OriginFood;
