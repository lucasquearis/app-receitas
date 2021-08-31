import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function IngredientesAPI(food) {
  const { setData } = useContext(RecipesContext);
  useEffect(() => {
    const response = async (request) => {
      const url = `https://www.the${request}db.com/api/json/v1/1/list.php?i=list`;
      await fetch(url).then((packJason) => packJason.json())
        .then((item) => {
          if (request === 'meal') {
            setData(item.meals);
          } else {
            setData(item.drinks);
          }
        });
    };
    if (food) {
      response('meal');
    } else {
      response('cocktail');
    }
  }, [setData, food]);
}

export default IngredientesAPI;
