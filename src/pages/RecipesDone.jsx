import React from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import RecipeDoneMealCard from '../components/RecipeDoneMealCard';
import RecipeDoneDrinkCard from '../components/RecipeDoneDrinkCard';
import recipesDoneMock from '../data/recipesDoneMock';

function RecipesDone() {
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
            recipesDoneMock.map(({
              id,
              type,
              area,
              category,
              alcoholicOrNot,
              name,
              image,
              doneDate,
              tags },
            index) => {
              if (type === 'comida') { // foto, nome, categoria, area, data, tags, botao share
                return (
                  <RecipeDoneMealCard
                    key={ +id }
                    id={ +id }
                    area={ area }
                    category={ category }
                    name={ name }
                    image={ image }
                    doneDate={ doneDate }
                    tagsName={ tags }
                    index={ +index }
                  />
                );
              }

              return (
                <RecipeDoneDrinkCard
                  key={ +id }
                  id={ +id }
                  alcoholicOrNot={ alcoholicOrNot }
                  name={ name }
                  image={ image }
                  doneDate={ doneDate }
                  tagsName={ tags }
                  index={ +index }
                />
              );
            })
          }
        </div>
      </main>
    </>
  );
}

export default RecipesDone;
