import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import rockGlass from '../images/rockGlass.svg';
import IngredientsCheckList from '../components/IngredientsCheckList';
import FinishRecipeButton from '../components/FinishRecipeButton';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

function RecipesInProgress(props) {
  const [recipe, setRecipe] = useState();
  const [enType, setEnType] = useState('drinks');
  const [enCasedType, setEnCasedType] = useState('Drink');
  const [favoriteType, setFavoriteType] = useState('bebida');
  const { match, history } = props;
  const { type, id } = match.params;
  const { pathname } = history.location;

  useEffect(() => {
    const getRecipe = async () => {
      let endpoint = '';
      if (type === 'comidas') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        setEnType('meals');
        setEnCasedType('Meal');
        setFavoriteType('comida');
      } else {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      await fetch(endpoint)
        .then((data) => data.json())
        .then((response) => {
          setRecipe(response);
        });
    };
    getRecipe();
  }, [id, type]);

  return (
    <div>
      {
        recipe
          ? (
            <div>
              <img
                src={ recipe[enType][0][`str${enCasedType}Thumb`] }
                alt="Foto do Prato"
                data-testid="recipe-photo"
              />
              <h1
                data-testid="recipe-title"
              >
                { recipe[enType][0][`str${enCasedType}`] }
              </h1>
              <ShareButton pathname={ pathname.split('/in')[0] } />
              <FavoriteButton
                recipe={
                  { id,
                    type: favoriteType,
                    area: recipe[enType][0].strArea || '',
                    category: recipe[enType][0].strCategory,
                    alcoholicOrNot: recipe[enType][0].strAlcoholic || '',
                    name: recipe[enType][0][`str${enCasedType}`],
                    image: recipe[enType][0][`str${enCasedType}Thumb`] }
                }
                testId="favorite-btn"
              />
              <h2 data-testid="recipe-category">
                { type === 'comidas'
                  ? recipe[enType][0].strCategory
                  : recipe[enType][0].strAlcoholic }
              </h2>
              <section>
                <IngredientsCheckList
                  recipe={ recipe[enType][0] }
                  pathname={ pathname }
                  id={ id }
                />
              </section>
              <p data-testid="instructions">{ recipe[enType][0].strInstructions }</p>
              <FinishRecipeButton
                id={ id }
                type={ type }
                enType={ enType }
              />
            </div>
          )
          : (
            <object
              className="rocksGlass"
              type="image/svg+xml"
              data={ rockGlass }
            >
              Glass
            </object>
          )
      }
    </div>
  );
}

RecipesInProgress.defaultProps = {
  match: undefined,
};

RecipesInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string,
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipesInProgress;
