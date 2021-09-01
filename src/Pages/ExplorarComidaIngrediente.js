import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import * as ComidasAPI from '../service/ComidasAPI';

export default function ExplorarComidaIngrediente() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      const ingredient = await ComidasAPI.buscarIngrediente();
      console.log(ingredient);
      const ingredientResult = ingredient.filter((_ing, index) => index < 12);
      setIngredients(ingredientResult);
    };
    getIngredients();
  }, []);

  console.log(ingredients);
  const cardIngredients = (ingred, index) => {
    const url = `https://www.themealdb.com/images/ingredients/${ingred.strIngredient}-Small.png`;
    return (
      <section key={ index }>
        <Link to={ }>
          <div data-testid={ `${index}-ingredient-card` }>
            <img src={ url } data-testid={ `${index}-card-img` } alt="img" />
            <p data-testid={ `${index}-card-name` }>{ ingred.strIngredient }</p>
          </div>
        </Link>
        { console.log(ingred)}
      </section>
    );
  };

  return (
    <>
      <section>
        <Header title="ExplorarComidaIngrediente" searchIcon />
      </section>
      { ingredients.map((ingredient, index) => cardIngredients(ingredient, index)) }
      <Footer />
    </>
  );
}
