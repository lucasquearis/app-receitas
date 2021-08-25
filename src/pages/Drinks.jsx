import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';
import ItemCard from '../components/ItemCard';

function Drinks() {
  const doze = 12;
  const { search } = useSelector((state) => state.recipes);
  const oneElementDetails = () => {
    if (search.drinks.lenght === 1) {
      return <Redirect to={ `/bebidas/${search.drinks.idDrink}` } />;
    }
  };

  useEffect(() => {
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
      <main>
        { search.drinks && search.drinks.map((drink, index) => index < doze && (<ItemCard
          title={ drink.strDrink }
          thumb={ drink.strDrinkThumb }
          id={ drink.idDrink }
          index={ index }
          key={ index }
        />)) }
      </main>
    </div>
  );
}

export default Drinks;
