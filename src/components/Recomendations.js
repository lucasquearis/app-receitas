import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/RecipeDetails.css';

function Recomendations(props) {
  const { type } = props;
  let endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const [enType, setEnType] = useState('meals');
  const [enCasedType, setEnCasedType] = useState('Meal');
  const [ptType, setPtType] = useState('comidas');
  const [recipes, setRecipes] = useState();
  const numberOfRecomendations = 6;

  useEffect(() => {
    if (type === 'comidas') {
      endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      setEnType('drinks');
      setEnCasedType('Drink');
      setPtType('bebidas');
    }
    const getRecomendations = async () => {
      await fetch(endpoint)
        .then((data) => data.json())
        .then((response) => {
          setRecipes(response);
        });
    };
    getRecomendations();
  }, []);

  const renderCards = () => {
    if (recipes) {
      const recipesList = recipes[enType].slice(0, numberOfRecomendations);
      return (
        <div className="recomendation-card">
          {
            recipesList.map((recipe, index) => (
              <Link
                key={ index }
                to={ `/redirecting/${ptType}/${recipe[`id${enCasedType}`]}` }
              >
                <div
                  data-testid={ `${index}-recomendation-card` }
                  key={ index }
                  hidden={ index > 1 }
                >
                  <img
                    className="recomendation-image"
                    src={ recipe[`str${enCasedType}Thumb`] }
                    alt={ `Recomendation-${index + 1}` }
                  />
                  <h5
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { recipe[`str${enCasedType}`] }
                  </h5>
                </div>
              </Link>
            ))
          }
        </div>
      );
    }
  };

  return (
    <div>
      { renderCards() }
    </div>
  );
}

Recomendations.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Recomendations;
