import React, { useContext, useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import { Redirect, useLocation } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import useFilter from '../hooks/useFilter';
import useFilterIngredient from '../hooks/useFilterIngredient';
import '../styles/foods-drinks.css';

function FoodsAndDrinks() {
  const { globalState } = useContext(AppContext);
  const { meals, drinks, mealsCategories, drinksCategories } = globalState;
  const { pathname } = useLocation();
  const { filter, setFilter, category, setCategory } = useFilter();
  const { itemsByIngredient, setItemsByIngredient } = useFilterIngredient();
  const [redirect, setRedirect] = useState(false);
  const [id, setId] = useState('');
  const numButtons = 5;
  let type = 'Meal';
  let cards = meals;
  let buttons = mealsCategories;

  useEffect(() => {
    if (itemsByIngredient.length !== 0) {
      setCategory(itemsByIngredient);
      setItemsByIngredient([]);
    }
  }, [itemsByIngredient, setCategory, setItemsByIngredient]);

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
      <button
        data-testid={ `${strCategory}-category-filter` }
        className="button-filter"
        type="button"
        key={ index }
        variant="secondary"
        value={ strCategory }
        onClick={ filterCategory }
      >
        { `${strCategory}` }
      </button>
    ));
    return buttonList;
  };

  const redirectToRecipe = async (idCard) => {
    await setId(idCard);
    await setRedirect(true);
  };

  const fillCards = () => {
    if (!category.length) return <span>Nenhum resultado encontrado</span>;

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
          alt={ item[`str${type}`] }
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
    <div className="pag-foods-drinks">
      { redirect && <Redirect to={ `${pathname}/${id}` } /> }
      <section className="container-button-filter">
        <button
          data-testid="All-category-filter"
          className="button-filter"
          type="button"
          variant="secondary"
          value="All"
          onClick={ filterCategory }
        >
          All
        </button>
        { getButtons() }
      </section>
      <section className="container-cards">
        { fillCards() }
      </section>
    </div>
  );
}

export default FoodsAndDrinks;
