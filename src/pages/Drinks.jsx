import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { func, number, string, objectOf, oneOfType, object } from 'prop-types';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';
import ItemCard from '../components/ItemCard';
import Footer from '../components/Footer';
import CategoryDrinkButtons from '../components/CategoryDrinkButtons';

function Drinks(props) {
  const { history } = props;
  const doze = 12;
  const { search } = useSelector((state) => state.recipes);
  const oneElementDetails = () => {
    if (search.drinks.length === 1) {
      console.log('aqui');
      history.push(`/bebidas/${search.drinks[0].idDrink}`);
    }
  };

  useEffect(() => {
    if (search.drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (search.drinks) {
      oneElementDetails();
    }
  });

  return (
    <div>
      <Header
        brand="Bebidas"
        src={ searchIcon }
        alt="search-icon"
        dataId="search-top-btn"
        className="img-search"
      />
      <CategoryDrinkButtons />

      <main>
        { search.drinks && search.drinks.map((drink, index) => index < doze && (<ItemCard
          title={ drink.strDrink }
          thumb={ drink.strDrinkThumb }
          id={ drink.idDrink }
          index={ index }
          key={ index }
        />)) }
      </main>
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  history: objectOf(oneOfType([func, string, number, object])),
}.isRequired;

export default Drinks;
