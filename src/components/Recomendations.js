import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Recomendations(props) {
  const { type } = props;
  let endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const [enType, setEnType] = useState('meals');
  const [enCasedType, setEnCasedType] = useState('Meal');
  const [recipes, setRecipes] = useState();
  const numberOfRecomendations = 6;

  useEffect(() => {
    if (type === 'comidas') {
      endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      setEnType('drinks');
      setEnCasedType('Drink');
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
        <div>
          {
            recipesList.map((recipe, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key={ index }
                hidden={ index > 1 }
              >
                <h3
                  data-testid={ `${index}-recomendation-title` }
                >
                  { recipe[`str${enCasedType}`] }
                </h3>
              </div>
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
