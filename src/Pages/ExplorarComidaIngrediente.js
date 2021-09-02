import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ComidasAPI from '../service/ComidasAPI';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipesContext from '../Context/RecipesContext';

export default function ExplorarComidaIngrediente() {
  const [ingredients, setIngredients] = useState([]);

  const { setIngredient } = useContext(RecipesContext);
  useEffect(() => {
    const getIngredients = async () => {
      const ingredient = await ComidasAPI.buscarIngrediente();
      const numberFoods = 12;
      const ingredientResult = ingredient.filter((_ing, index) => index < numberFoods);
      setIngredients(ingredientResult);
    };
    getIngredients();
  }, []);

  const updateNameIng = (name) => {
    setIngredient({ ing: true, nameIng: name });
  };

  const cardIngredients = (ingred, index) => {
    const url = `https://www.themealdb.com/images/ingredients/${ingred.strIngredient}-Small.png`;
    return (
      <section key={ index }>
        <button type="button" onClick={ () => updateNameIng(ingred.strIngredient) }>
          <Link to="/comidas">
            <div data-testid={ `${index}-ingredient-card` }>
              <img src={ url } data-testid={ `${index}-card-img` } alt="img" />
              <p data-testid={ `${index}-card-name` }>{ ingred.strIngredient }</p>
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
