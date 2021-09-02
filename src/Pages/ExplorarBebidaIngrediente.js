import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipesContext from '../Context/RecipesContext';
import * as BebidasAPI from '../service/BebidasAPI';

export default function ExplorarBebidasIngrediente() {
  const [ingredients, setIngredients] = useState([]);

  const { setIngredient } = useContext(RecipesContext);
  useEffect(() => {
    const getIngredients = async () => {
      const ingredient = await BebidasAPI.buscarIngrediente();
      const numberDrinks = 12;
      const ingredientResult = ingredient.drinks.filter(
        (_ing, index) => index < numberDrinks,
      );
      setIngredients(ingredientResult);
    };
    getIngredients();
  }, []);

  const updateNameIng = (name) => {
    setIngredient({ ing: true, nameIng: name });
  };

  const cardIngredients = (ingred, index) => {
    const url = `https://www.thecocktaildb.com/images/ingredients/${ingred.strIngredient1}-Small.png`;
    return (
      <section key={ index }>
        <button type="button" onClick={ () => updateNameIng(ingred.strIngredient1) }>
          <Link to="/bebidas">
            <div data-testid={ `${index}-ingredient-card` }>
              <img src={ url } data-testid={ `${index}-card-img` } alt="img" />
              <p data-testid={ `${index}-card-name` }>{ ingred.strIngredient1 }</p>
            </div>
          </Link>
        </button>
        {/* { console.log(ingred)} */}
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
