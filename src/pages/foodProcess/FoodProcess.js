import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderDetails from '../../components/HeaderDetails/HeaderDetails';
import { actionStoreInProcessFood } from '../../actions';
import { fetchApi } from '../../components/SearchBar/utils';
import {
  foodAndDrinksInProcessLocalStorage,
  updateLocalStorage,
  ingredientsMeasuresFunc,
  defineChecked,
} from '../../functions';
import RecipeFinishBtn from './RecipeFinishBtn';

const FoodProcess = ({ match: { params: { id } } }) => {
  const type = 'meals';
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => state.inProcessReducer);
  const [itensInfo, setItensInfo] = useState({
    image: '',
    title: '',
    category: '',
    recipe: [],
    instructions: '',
  });

  const [
    checkedIngredients,
    setCheckedIngredients,
  ] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetchApi(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const { strMeal, strCategory, strMealThumb, strInstructions } = response.meals[0];
        setItensInfo({
          image: strMealThumb,
          title: strMeal,
          category: strCategory,
          recipe: response.meals[0],
          instructions: strInstructions,
        });
        const ingredients = ingredientsMeasuresFunc(response);
        dispatch(actionStoreInProcessFood({
          id,
          ingredients: [...ingredients],
        }));
      } catch (error) {
        console.log(`Erro ao carregar as primeiras receitas: ${error}`);
      }
    };
    fetchItem();
    if (!localStorage.getItem('inProgressRecipes')) {
      foodAndDrinksInProcessLocalStorage();
    } else {
      const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setCheckedIngredients(getLocalStorage.meals[id] || []);
    }
  }, [dispatch, id]);

  const handleClick = (ing) => {
    if (checkedIngredients.some((ingredient) => ingredient === ing)) {
      const filteredIngredients = checkedIngredients.filter((ingredient) => (
        ingredient !== ing));
      setCheckedIngredients(filteredIngredients);
    } else {
      setCheckedIngredients([...checkedIngredients, ing]);
    }
    updateLocalStorage(id, ing, checkedIngredients, type);
  };

  if (meals[id] === undefined) return <h2>Loading...</h2>;
  return (
    <div>
      <div>
        <HeaderDetails
          image={ itensInfo.image }
          title={ itensInfo.title }
          category={ itensInfo.category }
          recipe={ itensInfo.recipe }
          id={ id }
        />
      </div>
      <div>
        <h3>Ingredients</h3>
        {
          meals[id].map((ing, index) => {
            const checked = defineChecked(ing, id, type);
            const style = checked ? 'inputChecked' : '';
            return (
              <div
                key={ ing }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  id={ ing }
                  type="checkbox"
                  onClick={ () => handleClick(ing) }
                  defaultChecked={ checked }
                />
                <label
                  htmlFor={ ing }
                  className={ style }
                >
                  {ing}
                </label>
              </div>
            );
          })
        }
      </div>
      <div>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
        >
          {itensInfo.instructions}
        </p>
      </div>
      <RecipeFinishBtn
        id={ id }
        type={ type }
      />
    </div>
  );
};

FoodProcess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodProcess;
