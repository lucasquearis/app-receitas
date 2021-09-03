import React, { useContext, useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect, useLocation } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import useFilter from '../hooks/useFilter';
import useFilterIngredient from '../hooks/useFilterIngredient';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import '../styles/foods-drinks.css';

function FoodsAndDrinks() {
  const { globalState, setLoadSearch } = useContext(AppContext);
  const { meals, drinks, mealsCategories, drinksCategories,
    loadSearch, search } = globalState;
  const { pathname } = useLocation();
  const { filter, setFilter, category, setCategory } = useFilter();
  const { itemsByIngredient, setItemsByIngredient } = useFilterIngredient();
  const [redirect, setRedirect] = useState(false);
  const [id, setId] = useState('');
  const numButtons = 5;
  let type = 'Meal';
  let cards = meals;
  let buttons = mealsCategories;
  let pag = 'Comidas';

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
    pag = 'Bebidas';
  }

  if (!cards.length || !buttons.length) {
    return (
      <Spinner className="loading" animation="border" role="status">
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
    setLoadSearch(false);
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
    let cardList = loadSearch ? search : category;

    if (!category.length) return <span>Nenhum resultado encontrado</span>;

    cardList = cardList.map((item, index) => (
      <button
        data-testid={ `${index}-recipe-card` }
        type="button"
        key={ index }
        className="horizontal-card"
        onClick={ () => redirectToRecipe(item[`id${type}`]) }
      >
        <img
          data-testid={ `${index}-card-img` }
          className="img-horizontal-card"
          alt={ item[`str${type}`] }
          src={ item[`str${type}Thumb`] }
        />
        <div className="horizontal-card-infos">
          <span
            data-testid={ `${index}-card-name` }
            className="name-horizontal-card"
          >
            { item[`str${type}`] }
          </span>
        </div>
      </button>
    ));
    return cardList;
  };

  return (
    <div className="pag-foods-drinks">
      <Header titlePage={ pag } btSearch />
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
      <Footer />
    </div>
  );
}

export default FoodsAndDrinks;
