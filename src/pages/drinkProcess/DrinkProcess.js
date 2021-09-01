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
} from '../../functions';

const DrinkProcess = ({ match: { params: { id } } }) => {
  const type = 'cocktails';
  const dispatch = useDispatch();
  const { cocktails } = useSelector((state) => state.inProcessReducer);
  const [itensInfo, setItensInfo] = useState({
    image: '',
    title: '',
    category: '',
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
    <div>
      <div>
        <HeaderDetails
          image={ itensInfo.image }
          title={ itensInfo.title }
          category={ itensInfo.category }
        />
      </div>
      <div>
        <h3>Ingredients</h3>
        <div>
          {
            cocktails[id].map((ing, index) => {
              const key = JSON.parse(localStorage.getItem('inProgressRecipes'));
              let checked;
              if (key.cocktails[id] !== undefined) {
                checked = key.cocktails[id].some((ingredient) => ingredient === ing);
              } else {
                checked = false;
              }
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
                  >
                    {ing}
                  </label>
                </div>
              );
            })
          }
        </div>
      </div>
      <div>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
        >
          {itensInfo.instructions}
        </p>
      </div>
      <div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
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
