import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../cssPages/ReceitasF.css';
import { ListGroup } from 'react-bootstrap';

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
  return (
    <div>
      <Header titulo="Receitas Feitas" pesquisa="false" />
      <div className="buttons">
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <CardGroup>
        {doneRecipes.map((recipe) => (
          <Card
            name={ recipe.name }
            style={ { width: '18rem' } }
            key={ recipe.id }
            // onClick={ onClick }
          >
            <Card.Img
              data-testid={ `${recipe.id}-horizontal-image` }
              variant="top"
              src={ `${recipe.image}` }
            />
            <Card.Body>
              <Card.Title
                data-testid={ `${recipe.id}-horizontal-name` }
              >
                { recipe.name }
              </Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
                data-testid={ `${recipe.id}-horizontal-top-text` }
              >
                {`${recipe.category} - 
                ${recipe.area.length === 0 ? recipe.alcoholicOrNot : recipe.area}`}

              </Card.Subtitle>
              <Card.Text data-testid={ `${recipe.id}-horizontal-done-date` }>
                {recipe.doneDate}
              </Card.Text>
              <ListGroup variant="flush">
                {recipe.tags.map((tag, index) => (
                  <ListGroup.Item key={ index }>
                    {tag}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))}

      </CardGroup>

    </div>
  );
}

export default ReceitasFeitas;
