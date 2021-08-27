import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Form } from 'react-bootstrap';

import ShareIcon from '../../components/Icons/ShareIcon';
import FavoriteIcon from '../../components/Icons/FavoriteIcon';
import getFavoriteValue from '../../services/functions';
import FinishButton from './Components/FinishButton';

import Context from '../../context';

function InProgress() {
  const { pathname } = useLocation();
  let id = pathname.match(/\d/g);
  id = id.join('');
  // https://stackoverflow.com/questions/10003683/how-can-i-extract-a-number-from-a-string-in-javascript

  const [details, setDetails] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [checkedIngredients, setCheckedIngredients] = React.useState({});
  const [isReady, setIsReady] = React.useState(false);
  const { inProgressList, setInProgressList } = useContext(Context);
  const query = pathname.includes('comidas') ? 'meal' : 'drink';
  const queryForUrl = query === 'meal' ? 'comida' : 'bebida';
  const type = query === 'meal' ? 'meals' : 'cocktails';
  const recipeId = query === 'meal' ? details.idMeal : details.idDrink;
  const [isCopied, setIsCopied] = useState(false);
  const [favoriteValue, setFavoriteValue] = useState({});

  const handleClickCopy = () => {
    setIsCopied(true);
  };

  useEffect(() => {
    if (inProgressList[type]) {
      const newCheckedIngredients = inProgressList[type][recipeId] || [];
      setCheckedIngredients(newCheckedIngredients);
    }
  }, [inProgressList, setCheckedIngredients, recipeId, type]);

  React.useEffect(() => {
    const api = query === 'meal' ? 'themealdb' : 'thecocktaildb';
    const url = `https://www.${api}.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      const filteredData = data[`${query}s`][0];
      setFavoriteValue(getFavoriteValue(query, filteredData));
      setDetails(filteredData);
      setLoading(false);
    };
    fetchData();
  }, [id, query]);

  const src = details[`str${query.charAt(0).toUpperCase() + query.slice(1)}Thumb`];
  const name = details[`str${query.charAt(0).toUpperCase() + query.slice(1)}`];
  const ingredients = Object.entries(details)
    .filter((entry) => entry[0].includes('strIngredient') && entry[1]);
  const handleClick = (ingredient) => {
    setInProgressList(recipeId, ingredient, type);
  };

  React.useEffect(() => {
    setIsReady(checkedIngredients.length === ingredients.length);
  }, [checkedIngredients, ingredients]);

  if (loading) return 'Loading';

  return (
    <div className="p-2 pb-5">
      <img src={ src } alt={ name } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{name}</h2>
      <p data-testid="recipe-category">{details.strCategory}</p>

      <ShareIcon
        dataTestId="share-btn"
        onClick={ handleClickCopy }
        url={ `/${queryForUrl}s/${id}` }
      />
      <FavoriteIcon recipe={ favoriteValue } dataTestId="favorite-btn" />
      {isCopied && <p className="copied-msg">Link copiado!</p>}

      {ingredients.map((ingredient, index) => (
        <div key={ ingredient[0] } data-testid={ `${index}-ingredient-step` }>
          <Form.Check
            label={ ingredient[1] }
            checked={ checkedIngredients.includes(ingredient[1]) }
            onChange={ () => handleClick(ingredient[1]) }
            className={ checkedIngredients.includes(ingredient[1]) ? 'checked' : '' }
          />
        </div>
      ))}

      <p data-testid="instructions">{details.strInstructions}</p>
      <FinishButton type={ query } isReady={ isReady } recipe={ details } />
    </div>
  );
}

export default InProgress;
