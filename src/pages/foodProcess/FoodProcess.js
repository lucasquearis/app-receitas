import React, {useEffect, useState} from 'react';
import HeaderDetails from '../../components/HeaderDetails/HeaderDetails';
import { useDispatch } from 'react-redux';
import { actionRequestItems } from '../../actions';
import { fetchApi } from '../../components/SearchBar/utils';
import { ingredientsMeasuresFunc } from './utils';

const FoodProcess = ({ match: { params: { id }} }) => {
  const dispatch = useDispatch();
  const [itensInfo, setItensInfo] = useState({
    image: '',
    title: '',
    category: '',
    instructions: '',
    ingredients: [],
  });

  useEffect(() => {
    const fetchItem = async () => {
      dispatch(actionRequestItems());
      try{
        const response = await fetchApi(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        console.log(response);
        const { strMeal, strCategory, strMealThumb, strInstructions  } = response.meals[0];
        setItensInfo({
          image: strMealThumb,
          title: strMeal,
          category: strCategory,
          instructions: strInstructions,
          ingredients: ingredientsMeasuresFunc(response)
        })
      } catch (error) {
        console.log(`Erro ao carregar as primeiras receitas: ${error}`)
      }
    }
    fetchItem();
  }, [dispatch, id])

  return(
    <div>
      <div>
        <HeaderDetails
          image={ itensInfo.image }
          title={ itensInfo.title}
          category={ itensInfo.category }
        />
      </div>
      <div>
        <h3>Ingredients</h3>
          <ul>
            {
              itensInfo.ingredients.map((ing, index) => {
                return (
                  <li
                    key={ ing }
                    data-testid={`data-testid=${index}-ingredient-step`}
                  >
                    <input type="checkbox" />
                    {ing}
                  </li>
                )})
            }
          </ul>
        
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
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  )
};

export default FoodProcess;
