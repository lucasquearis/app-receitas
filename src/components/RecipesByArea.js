import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchByArea from '../service/fetchByArea';

function RecipesByArea() {
  const { area } = useContext(RecipesContext);
  console.log(area);
  const endNumber = 12;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const meals = await fetchByArea(area);
      setRecipes(meals);
    }; getRecipes();
  }, [area]);

  const show = [...recipes].slice(0, endNumber);
  console.log(show);
  return (
    show.map((s, index) => (
      <Link
        key={ s.strMeal }
        to={ `/comidas/${s.idMeal}` }
      >
        <div className="card bg-info mb-2" data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            alt="Recipe"
            src={ s.strMealThumb }
            className="card-img-top"
          />
          <p
            className="card-body text-body text-center"
            data-testid={ `${index}-card-name` }
          >
            { s.strMeal }
          </p>
        </div>
      </Link>
    )));
}

export default RecipesByArea;
