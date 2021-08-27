import React from 'react';
import Button from 'react-bootstrap/Button';
import useFilterMade from '../hooks/useFilterMade';
import share from '../images/shareIcon.svg';

function MadeRecipes() {
  const { madeRecipes, setFilter } = useFilterMade();
  const types = ['all', 'food', 'drink', 'All', 'Food', 'Drinks'];
  const numButtons = 3;

  const filterType = ({ target: { value } }) => {
    if (filter === value) {
      setFilter('All');
    } else {
      setFilter(value);
    }
  };

  // doneRecipes

// [{
//   id: id-da-receita,
//   type: comida-ou-bebida,
//   area: area-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita,
//   doneDate: quando-a-receita-foi-concluida,
//   tags: array-de-tags-da-receita-ou-array-vazio
// }]

  const cardFood = (recipe, index) => {
    const { name, image, category } = recipe;
    return (
      <div key={ index }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
        <div>
          <div>
            <span data-testid={ `${index}-horizontal-top-text` }>{ category }</span>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ share }
              alt={ name }
            />
          </div>
          <span data-testid={ `${index}-horizontal-name` }>{ name }</span>
          <span data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</span>
          <div>
            { tags.map((tag) => (
              <div
                data-testid={ `${index}-${tagName}-horizontal-tag` }
                key={ name }
              >
                { tag }
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const cardDrink = (recipe, index) => {
    const { name, image, category } = recipe;
    return (
      <div key={ index }>
        <img data-testid={ `${index}-horizontal-image` } />
        <div>
          <div>
            <span data-testid={ `${index}-horizontal-top-text` }>Alcoolica ou nao</span>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ share }
              alt={ name }
            />
          </div>
          <span data-testid={ `${index}-horizontal-name` }>Nome receita</span>
          <span data-testid={ `${index}-horizontal-done-date` }>Data</span>
        </div>
      </div>
    );
  };

  const fillCards = () => {
    if (!madeRecipes.length) return <span>Nenhuma receita feita</span>;

    return madeRecipes.map((recipe, index) => {
      if (recipe.type === 'food') cardFood(recipe, index);
      else cardDrink(recipe, index);
    });
  };

  return (
    <>
      <section>
        { types.slice(0, numButtons).map((item, index) => (
          <Button
            data-testid={ `filter-by-${item}-btn` }
            key={ item }
            variant="primary"
            value={ item }
            onClick={ filterType }
          >
            { types[index + numButtons] }
          </Button>
        )) }
      </section>
      <section>
        { fillCards() }
      </section>
    </>
  );
}

export default MadeRecipes;
