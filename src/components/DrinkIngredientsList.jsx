import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import searchDrinkId from '../services/Header-SearchBar/Drinks/searchDrinkId';
import Loading from './Loading';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import MyContext from '../context';

const DrinksIngredientsList = ({ id }) => {
  const {
    checkedIngredients,
    setCheckedIngredients,
    resultAPIDrinks,
    setResultAPIDrinks } = useContext(MyContext);
  const [linkShare, setLinkShare] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);

  useEffect(() => {
    const parseLocalStorage = JSON
      .parse(localStorage
        .getItem('favoriteRecipes')) || [];
    const verifyFavorite = parseLocalStorage.some((item) => item.id === id);
    setFavoriteRecipe(verifyFavorite);
  }, [id, favoriteRecipe]);

  useEffect(() => {
    const resolveAPIDrinks = async () => {
      const { drinks } = await searchDrinkId(id);
      setResultAPIDrinks(drinks);
    };
    resolveAPIDrinks();
    const { cocktails } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: { [id]: [] }, meals: {} };
    if (cocktails[id]) {
      setCheckedIngredients([...cocktails[id]]);
    }
  }, [id, setCheckedIngredients, setResultAPIDrinks]);

  const handleClick = ({ target: { name } }) => {
    const getLocalStorage = () => JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: { [id]: [name] }, meals: {} };
    const removeIngredient = getLocalStorage().cocktails[id]
      .filter((ingredient) => ingredient !== name);
    const isOnList = getLocalStorage().cocktails[id].includes(name);
    if (!isOnList) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({
          ...getLocalStorage(),
          cocktails: { ...getLocalStorage().cocktails,
            [id]: [...getLocalStorage().cocktails[id],
              name] } }));
      return false;
    }

    localStorage.setItem('inProgressRecipes', JSON
      .stringify({
        ...getLocalStorage(),
        cocktails: { ...getLocalStorage().cocktails,
          [id]: removeIngredient } }));
  };

  const updateStateFromLocalStorage = () => {
    const { cocktails } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: { [id]: [] }, meals: {} };
    setCheckedIngredients([...cocktails[id]]);
  };

  const isIngredientChecked = (comparison) => checkedIngredients
    .some((ingredient) => ingredient === comparison);

  if (resultAPIDrinks.length > 0) {
    const {
      strDrink,
      strDrinkThumb,
      strAlcoholic,
      strInstructions,
      strCategory,
    } = resultAPIDrinks[0];

    const listFromKeys = Object.keys(resultAPIDrinks[0]);
    const filteredIngredients = listFromKeys
      .filter((item) => item
        .includes('strIngredient'));
    const filteredMeasures = listFromKeys
      .filter((item) => item
        .includes('strMeasure'));
    return (
      <>
        <h1 data-testid="recipe-title">{ strDrink }</h1>
        <img
          data-testid="recipe-photo"
          className="recipe-details__thumb"
          src={ strDrinkThumb }
          alt={ strDrink }
        />
        <div className="recipe-progress__category-name-div">
          <p data-testid="recipe-category">{ strCategory }</p>
        </div>
        <div className="recipe-progress__share-and-favorite-btn-div">
          <FavoriteButton
            id={ id }
            type="bebida"
            category={ strCategory }
            alcoholicOrNot={ strAlcoholic }
            name={ strDrink }
            image={ strDrinkThumb }
            favoriteRecipe={ favoriteRecipe }
            setFavoriteRecipe={ setFavoriteRecipe }
          />
          <ShareButton
            id={ id }
            setLinkShare={ setLinkShare }
            type="bebidas"
          />
          {linkShare && 'Link copiado!'}
        </div>
        <ul className="progress__checkbox-list">
          {filteredIngredients.map((ingredient, index) => {
            if (resultAPIDrinks[0][ingredient]) {
              return (
                <li
                  data-testid={ `${index}-ingredient-step` }
                  key={ ingredient }
                >
                  <input
                    name={ resultAPIDrinks[0][ingredient] }
                    type="checkbox"
                    id={ `${ingredient}-checkbox` }
                    onClick={ handleClick }
                    onChange={ updateStateFromLocalStorage }
                    checked={ isIngredientChecked(resultAPIDrinks[0][ingredient]) }
                  />
                  <span>
                    {resultAPIDrinks[0][ingredient]}
                    {' '}
                    -
                    {' '}
                    { resultAPIDrinks[0][filteredMeasures[index]] }
                  </span>
                </li>
              );
            }
            return true;
          })}
        </ul>
        <h2>Instruções</h2>
        <p data-testid="instructions">{ strInstructions }</p>
      </>
    );
  }
  return <Loading />;
};

export default DrinksIngredientsList;

DrinksIngredientsList.propTypes = {
  id: PropTypes.number,
}.isRequired;
