import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Spinner, FormCheck } from 'react-bootstrap';
import { getDataDetails } from '../services/api';
// import ingredientsDetails from '../helpers/getIngredients';

export default function ProgressRecipes() {
  const location = useLocation();
  const currentPage = location.pathname;

  const { id } = useParams();

  const [recipes, setRecipes] = useState({ id });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    recipeId: '',
    title: '',
    image: '',
    category: '',
    instructions: '',
    alcoholic: '',
  });

  useEffect(() => {
    const getRecipes = async (drinkId) => {
      await getDataDetails(drinkId).then((response) => setRecipes(response));
      setLoading(false);
    };
    getRecipes(id);
  }, [id]);

  useEffect(() => {
    setLoading(true);
    if (currentPage.includes('comidas')) {
      const {
        idMeal,
        strMealThumb,
        strMeal,
        strCategory,
        strInstructions,
      } = recipes;
      setData({
        recipeId: idMeal,
        image: strMealThumb,
        title: strMeal,
        category: strCategory,
        instructions: strInstructions,
      });
    }
    const {
      idDrink,
      strDrinkThumb,
      strDrink,
      strInstructions,
      strAlcoholic,
    } = recipes;
    setData({
      recipeId: idDrink,
      image: strDrinkThumb,
      title: strDrink,
      instructions: strInstructions,
      alcoholic: strAlcoholic,
    });
    setLoading(false);
  }, [currentPage, recipes]);

  console.log(data);

  return (
    <div>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <RecipeDetailCard
          data={ recipes }
          id={ data.recipeId }
          key={ data.recipeId }
          img={ data.image }
          title={ data.title }
          category={ data.alcoholic }
          ingredients={
            data.recipeId ? ingredientsDetails(recipes).map((item, index) => (
              <FormCheck
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
                label={ item }
              />
            )) : []
          }
          instructions={ data.instructions }
        />
      )}
    </div>
  );
}
