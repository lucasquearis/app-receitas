import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import './pageCSS/ExploreMealsByIngredient.css';
import fetchIngredients from '../services/Header-SearchBar/Foods/fetchIngredients';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Loading from '../components/Loading';
import MyContext from '../context';

export default function ExploreMealsByIngredient() {
  const [ingredients, setIngredients] = useState([]);
  const { setSelectedIngredient } = useContext(MyContext);
  const max = 12;

  useEffect(() => {
    fetchIngredients().then((response) => {
      setIngredients(response.meals);
    });
  }, []);

  const cardIngredient = (index, data) => {
    const { strIngredient } = data;
    return (
      <Link
        to="/comidas"
        onClick={ () => setSelectedIngredient(strIngredient) }
      >
        <div
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ strIngredient }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
        </div>
      </Link>
    );
  };

  const fillIngredients = () => {
    if (ingredients === 0) return <Loading />;
    return ingredients.slice(0, max)
      .map((ingredient, index) => cardIngredient(index, ingredient));
  };

  if (ingredients) {
    return (
      <>
        <HeaderNoSearch title="Explorar Ingredientes" />
        { fillIngredients() }
        <BottomMenu />
      </>
    );
  }
  return <Loading />;
}
