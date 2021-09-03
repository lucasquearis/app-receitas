import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { v4 } from 'uuid';
import { Redirect } from 'react-router-dom';
import ShareBtn from '../components/ShareBtn';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import { setLoading } from '../redux/actions/loading';
import useRedirect from '../hooks/useRedirect';

function RecipesDone() {
  const { shouldRedirect, redirect } = useRedirect();
  const [recipes, setRecipes] = useState([]);
  const [typeRecipes, setTypeRecipes] = useState('All');
  const { loading } = useSelector((state) => state);

  useEffect(() => {
    setLoading(true);
    const getData = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getData) {
      setRecipes(getData);
      setLoading(false);
    }
  }, []);

  // const handleClickAll = () => {
  //   const newMeals = [...meals.slice(0, TWELVE)];
  //   setRenderedMeals(newMeals);
  // };

  const filterRecipes = (param, cards) => {
    // if (param ===) {
    //   results = cards;
    //   return results;
    // } else {
    //   return cards
    // }
    // const filterFood = cards.type === 'comida');
    // const filterdrink = cards.type === 'bebida') || [];
    switch (param) {
    case 'comida':
      return cards.type === 'comida';
    case 'bebida':
      return cards.type === 'bebida';
    default:
      return cards;
    }
  };

  function doneCard(cards, index) {
    const {
      area = '',
      alcoholicOrNot = '',
      category = '',
      doneDate,
      image,
      name,
      tags,
      type,
      id,
    } = filterRecipes(typeRecipes, cards);

    const types = type === 'comida' ? 'comida' : 'bebida';
    if (redirect.should) return <Redirect to={ redirect.path } />;

    return (
      <div key={ index } className="recipes-card">
        <button
          type="button"
          onClick={ () => shouldRedirect(`/${type}s/${id}`) }
          key={ v4() }
          data-testid={ `${index}-recipe-card` }
          className="recipe-card"
        >
          <img
            src={ image }
            alt="recipe"
            data-testid={ `${index}-horizontal-image` }
            width="250"
          />
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </p>
        </button>
        <div>
          {alcoholicOrNot === ''
            ? (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${area} - ${category}` }
              </p>)
            : (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { alcoholicOrNot }
              </p>)}
        </div>
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          { doneDate }
        </p>
        <ShareBtn
          testid={ `${index}-horizontal-share-btn` }
          id={ id }
          type={ types }
        />
        { tags.map((item) => {
          const tagItem = (
            <p
              key={ item }
              data-testid={ `${index}-${item}-horizontal-tag` }
            >
              { item }
            </p>
          );
          return tagItem;
        }) }
      </div>
    );
  }
  return (
    <div>
      <HeaderWithoutSearch>Receitas Feitas</HeaderWithoutSearch>
      <nav>
        <Button
          variant="success"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setTypeRecipes('All') }
        >
          All
        </Button>
        <Button
          variant="success"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setTypeRecipes('comida') }
        >
          Food
        </Button>
        <Button
          variant="success"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setTypeRecipes('bebida') }
        >
          Drinks
        </Button>
      </nav>

      <div>
        { loading
          ? <h1>Loading</h1>
          : recipes.map((recipe, index) => doneCard(recipe, index))}
      </div>
    </div>
  );
}

export default RecipesDone;
