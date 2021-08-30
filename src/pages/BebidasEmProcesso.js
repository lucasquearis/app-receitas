import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

export default function BebidasEmProcesso() {
  const [drink, setDrink] = useState();
  const location = useLocation();
  const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  useEffect(() => {
    const api = async () => {
      const idApi = location.pathname.split('/')[2];
      console.log(idApi);
      const response = await fetch(`${URL_DRINK}${idApi}`);
      const data = await response.json();
      setDrink(data.drinks[0]);
    };
    api();
  }, []);

  const getInitialCheckboxState = () => ({});
  const [checkbox, setCheckbox] = useState(getInitialCheckboxState());

  const handleCheckboxChange = ({ target }) => {
    setCheckbox({
      ...checkbox,
      [target.name]: target.checked,
    });
  };

  const setIngredients = () => {
    const ingredients1 = Object.keys(drink)
      .filter((ingredient) => ingredient
        .includes('strIngredient')
        && drink[ingredient] !== null && drink[ingredient] !== '');
    return ingredients1.map((ingredientKey, index) => (
      <li
        data-testid={ `${index}-ingredient-step` }
        key={ index }
        className="list-no-style"
        style={ checkbox[drink[ingredientKey]] && { 'text-decoration': 'line-through' } }
      >
        <input
          name={ drink[ingredientKey] }
          type="checkbox"
          onChange={ handleCheckboxChange }
        />
        {` ${drink[ingredientKey]} - ${drink[`strMeasure${index + 1}`]}`}

      </li>));
  };

  if (drink === undefined) {
    return <Loading />;
  }

  return (
    <div>
      {/* <p>{drink.idDrink}</p> */}
      <img src={ drink.strDrinkThumb } alt="recipe" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
      <p data-testid="recipe-category">{drink.strAlcoholic}</p>
      <ul>
        {setIngredients()}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}
