import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import ShareBtn from '../components/ShareBtn';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import { setLoading } from '../redux/actions/loading';
import Loading from '../components/Loading';

function RecipesDone() {
  const [recipes, setRecipes] = useState([]);
  const { loading } = useSelector((state) => state.reducerAPI);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const getData = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getData) {
      setRecipes(getData);
    }
    dispatch(setLoading(false));
  }, [dispatch]);

  function doneCard(card, index) {
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
    } = card;

    const types = type === 'comida' ? 'comida' : 'bebida';

    return (
      <div key={ index } className="recipes-card">
        <img
          src={ image }
          alt="recipe"
          data-testid={ `${index}-horizontal-image` }
          width="250"
        />
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
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </p>
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
        { !tags ? null : tags.map((item) => {
          const tagItem = (
            <p key={ item } data-testid={ `${index}-${item}-horizontal-tag` }>{ item }</p>
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
        >
          All
        </Button>
        <Button
          variant="success"
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </Button>
        <Button
          variant="success"
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </Button>
      </nav>

      <div>
        { loading
          ? <Loading />
          : recipes.map((recipe, index) => doneCard(recipe, index))}
      </div>
    </div>
  );
}

export default RecipesDone;
