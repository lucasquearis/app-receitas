import React, { useEffect, useState } from 'react';
import { Card } from '../components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const drinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const MAX_LENGTH = 12;

const Drinks = () => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const getDrinks = async () => {
      let drinksResult = await fetch(drinksAPI).then((response) => response.json());
      drinksResult = drinksResult.drinks;
      drinksResult = drinksResult.slice(0, MAX_LENGTH);
      setDrinks(drinksResult);
    };
    getDrinks();
  }, []);

  console.log(drinks);

  return (
    <div className="drinks-container">
      <Header />
      { drinks.map((drink, index) => (
        <Card
          key={ drink.idDrink }
          type="Drink"
          index={ index }
          thumb={ drink.strDrinkThumb }
          name={ drink.strDrink }
        />
      ))}
      <Footer />
    </div>
  );
};

export default Drinks;
