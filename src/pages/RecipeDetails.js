import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import rockGlass from '../images/rockGlass.svg';
import IngredientsList from '../components/IngredientsList';
import Recomendations from '../components/Recomendations';
import StartRecipeButton from '../components/StartRecipeButton';
import '../styles/RecipeDetails.css';

function RecipeDetails(props) {
  const [recipe, setRecipe] = useState();
  const [enType, setEnType] = useState('drinks');
  const [enCasedType, setEnCasedType] = useState('Drink');
  const { match } = props;
  const { type, id } = match.params;

  useEffect(() => {
    const getRecipe = async () => {
      let endpoint = '';
      if (type === 'comidas') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        setEnType('meals');
        setEnCasedType('Meal');
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
  }, []);

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
              <object type="image/svg+xml" data={ shareIcon } data-testid="share-btn">
                Compartilhar
              </object>
              <object
                type="image/svg+xml"
                data={ blackHeartIcon }
                data-testid="favorite-btn"
              >
                Adicionar a favoritos
              </object>
              <h2 data-testid="recipe-category">
                { type === 'comidas'
                  ? recipe[enType][0].strCategory
                  : recipe[enType][0].strAlcoholic }
              </h2>
              <ul>
                <IngredientsList recipe={ recipe[enType][0] } />
              </ul>
              <p data-testid="instructions">{ recipe[enType][0].strInstructions }</p>
              <iframe title="Video" data-testid="video" src="https://www.youtube.com/embed/kJkQFVqySUw" />
              {
                recipe && <Recomendations type={ type } />
              }
              <StartRecipeButton id={ id } type={ type } enType={ enType } />
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

RecipeDetails.propTypes = {
  match: PropTypes.arrayOf([
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ]).isRequired,
};

export default RecipeDetails;
