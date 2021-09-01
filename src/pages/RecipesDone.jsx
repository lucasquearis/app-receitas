import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import { setLoading } from '../redux/actions/loading';
import shareIcon from '../images/shareIcon.svg';

function RecipeDone() {
  const [recipes, setRecipes] = useState([]);
  const { loading } = useSelector((state) => state);

  useEffect(() => {
    // teste
  //   const doneRecipes = [
  //     {
  //       id: '52771',
  //       type: 'comida',
  //       area: 'Italian',
  //       category: 'Vegetarian',
  //       alcoholicOrNot: '',
  //       name: 'Spicy Arrabiata Penne',
  //       image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //       doneDate: '23/06/2020',
  //       tags: ['Pasta', 'Curry'],
  //     },
  //     {
  //       id: '178319',
  //       type: 'bebida',
  //       area: '',
  //       category: 'Cocktail',
  //       alcoholicOrNot: 'Alcoholic',
  //       name: 'Aquamarine',
  //       image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //       doneDate: '23/06/2020',
  //       tags: [],
  //     },
  //   ];
  //   localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    setLoading(true);
    const getData = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getData) {
      setRecipes(getData);
      setLoading(false);
    }
  }, []);

  function doneCard(card, index) {
    const {
      area = '',
      alcoholicOrNot = '',
      category = '',
      doneDate,
      image,
      name,
      tags,
    } = card;
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
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share recipe"
        />
        { tags.map((item) => {
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
          ? <h1>Loading</h1>
          : recipes.map((recipe, index) => doneCard(recipe, index))}
      </div>
    </div>
  );
}

export default RecipeDone;
