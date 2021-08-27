import React, { useContext, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Redirect, useLocation } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import useFilter from '../hooks/useFilter';

function FoodsAndDrinks() {
  const { globalState } = useContext(AppContext);
  const { meals, drinks, mealsCategories, drinksCategories } = globalState;
  const { pathname } = useLocation();
  const { filter, setFilter, category } = useFilter();
  const [redirect, setRedirect] = useState(false);
  const [id, setId] = useState('');
  const numButtons = 5;
  let type = 'Meal';
  let cards = meals;
  let buttons = mealsCategories;

  if (pathname === '/bebidas') {
    type = 'Drink';
    cards = drinks;
    buttons = drinksCategories;
  }

  if (!cards.length || !buttons.length) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden"> </span>
      </Spinner>
    );
  }

  buttons = buttons.slice(0, numButtons);

  const filterCategory = ({ target: { value } }) => {
    if (filter === value) {
      setFilter('All');
    } else {
      setFilter(value);
    }
  };

  const getButtons = () => {
    const buttonList = buttons.map(({ strCategory }, index) => (
      <Button
        data-testid={ `${strCategory}-category-filter` }
        key={ index }
        variant="secondary"
        value={ strCategory }
        onClick={ filterCategory }
      >
        { `${strCategory}` }
      </Button>
    ));
    return buttonList;
  };

  const redirectToRecipe = async (idCard) => {
    await setId(idCard);
    await setRedirect(true);
  };

  const fillCards = () => {
    if (!category.length) return <span>Void</span>;

    const cardList = category.map((item, index) => (
      <Card
        data-testid={ `${index}-recipe-card` }
        key={ index }
        className="main-card"
        style={ { width: '8.75rem' } }
        onClick={ () => redirectToRecipe(item[`id${type}`]) }
      >
        <Card.Img
          data-testid={ `${index}-card-img` }
          variant="top"
          src={ item[`str${type}Thumb`] }
        />
        <Card.Body>
          <Card.Title
            data-testid={ `${index}-card-name` }
          >
            { item[`str${type}`] }
          </Card.Title>
        </Card.Body>
      </Card>
    ));
    return cardList;
  };

  return (
    <>
      { redirect && <Redirect to={ `${pathname}/${id}` } /> }
      <section className="main-buttons">
        <Button
          data-testid="All-category-filter"
          variant="secondary"
          value="All"
          onClick={ filterCategory }
        >
          All
        </Button>
        { getButtons() }
      </section>
      <section className="main-cards">
        { fillCards() }
      </section>
    </>
  );
}

export default FoodsAndDrinks;
