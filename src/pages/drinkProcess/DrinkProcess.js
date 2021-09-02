import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderDetails from '../../components/HeaderDetails/HeaderDetails';
import { fetchApi } from '../../components/SearchBar/utils';
import { actionStoreInProcessCocktail } from '../../actions';
import {
  foodAndDrinksInProcessLocalStorage,
  updateLocalStorage,
  ingredientsMeasuresFunc,
  defineChecked,
} from '../../functions';
import RecipeFinishBtn from '../foodProcess/RecipeFinishBtn';
import './DrinkProcess.css';

const DrinkProcess = ({ match: { params: { id } } }) => {
  const type = 'cocktails';
  const dispatch = useDispatch();
  const { cocktails } = useSelector((state) => state.inProcessReducer);
  const [itensInfo, setItensInfo] = useState({
    image: '',
    title: '',
    category: '',
    recipe: {},
    instructions: '',
  });

  const [
    checkedIngredients,
    setCheckedIngredients,
  ] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const {
          strDrink,
          strCategory,
          strDrinkThumb,
          strInstructions,
        } = response.drinks[0];
        setItensInfo({
          image: strDrinkThumb,
          title: strDrink,
          category: strCategory,
          recipe: response.drinks[0],
          instructions: strInstructions,
        });
        const ingredients = ingredientsMeasuresFunc(response);
        dispatch(actionStoreInProcessCocktail({
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

  if (cocktails[id] === undefined) return <h2>Loading...</h2>;
  return (
    <div className="recipe-process-body">
      <div>
        <HeaderDetails
          image={ itensInfo.image }
          title={ itensInfo.title }
          category={ itensInfo.category }
          recipe={ itensInfo.recipe }
          id={ id }
        />
      </div>
      <div className="cocktails-recipe-ingredients-box">
        <div className="cocktails-recipe-ingredients-title">
          <h3>Ingredients</h3>
        </div>
        <div className="cocktails-recipe-ingredients">
          {
            cocktails[id].map((ing, index) => {
              const checked = defineChecked(ing, id, type);
              const style = checked ? 'inputChecked' : '';
              return (
                <div
                  key={ ing }
                  data-testid={ `${index}-ingredient-step` }
                  className="label-checkbox-box"
                >
                  <div className="checkbox-box">
                    <input
                      id={ ing }
                      type="checkbox"
                      onClick={ () => handleClick(ing) }
                      defaultChecked={ checked }
                    />
                  </div>
                  <div className="label-box">
                    <label
                      htmlFor={ ing }
                      className={ style }
                    >
                      {ing}
                    </label>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className="cocktails-recipe-instructions-box">
        <div className="cocktails-recipe-instructions-title">
          <h3>Instructions</h3>
        </div>
        <div className="cocktails-recipe-instructions">
          <p
            data-testid="instructions"
          >
            {itensInfo.instructions}
          </p>
        </div>
        <div className="finish-recipe-btn-box">
          <RecipeFinishBtn
            id={ id }
            type={ type }
          />
        </div>
      </div>
    </div>
  );
};

DrinkProcess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkProcess;
