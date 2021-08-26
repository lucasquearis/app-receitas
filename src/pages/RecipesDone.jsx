import React from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import RecipeDoneCard from '../components/RecipeDoneCard';

function RecipesDone() {
  const doneRecipesMock = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  return (
    <>
      <Header title="Refeitas Feitas" />
      <main>
        <div>
          <Button
            variant="primary"
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => {} }
          >
            All
          </Button>

          <Button
            variant="primary"
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => {} }
          >
            Food
          </Button>

          <Button
            variant="primary"
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => {} }
          >
            Drinks
          </Button>
        </div>
        <div>
          {
            doneRecipesMock.map(({
              name,
              image,
              category,
              id,
              tags },
            index) => (
              <RecipeDoneCard
                key={ +id }
                link=""
                id={ +id }
                img={ image }
                name={ name }
                date="26092021"
                category={ category }
                index={ +index }
                tagsName={ tags }
              />))
          }
        </div>
      </main>
    </>
  );
}

export default RecipesDone;
