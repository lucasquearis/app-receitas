import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { ListGroup } from 'react-bootstrap';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../cssPages/ReceitasF.css';

function ReceitasFeitas() {
  const doneRecipes = [
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
  const minNumber = 2;
  return (
    <div>
      <Header titulo="Receitas Feitas" pesquisa="false" />
      <div className="buttons">
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <CardGroup>
        {doneRecipes.map((recipe, index) => (
          <Card
            name={ recipe.name }
            style={ { width: '18rem' } }
            key={ index }
            // onClick={ onClick }
          >
            <Card.Img
              data-testid={ `${index}-horizontal-image` }
              variant="top"
              src={ `${recipe.image}` }
            />
            <Card.Body>
              <div className="paizao">
                <Card.Title
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }
                </Card.Title>
                <img
                  className="shareIcon"
                  alt={ recipe.name }
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </div>
              <Card.Subtitle
                className="mb-2 text-muted"
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.area.length === 0 ? recipe.alcoholicOrNot : recipe.area}  -  
                ${recipe.category}`}

              </Card.Subtitle>
              <Card.Text data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate}
              </Card.Text>

              <ListGroup variant="flush">
                {
                  recipe.tags.length === 0 ? ''
                    : recipe.tags.map((tag, count) => count > minNumber || (
                      <ListGroup.Item
                        key={ count }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {' '}
                        {tag}
                        {' '}
                      </ListGroup.Item>))
                }
              </ListGroup>

            </Card.Body>
          </Card>
        ))}

      </CardGroup>

    </div>
  );
}

export default ReceitasFeitas;
