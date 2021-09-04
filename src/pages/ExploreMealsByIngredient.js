import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
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
      <div className="explore-ingredients--meals__card">
        <Link
          to="/app-receitas/comidas"
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
            <h3 data-testid={ `${index}-card-name` }>{ strIngredient }</h3>
          </div>
        </Link>
      </div>
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
        <HeaderNoSearch title="Ingredientes" />
        <div className="explore-ingredients--meals__card-div">
          { fillIngredients() }
        </div>
        <br />
        <BottomMenu />
      </>
    );
  }
  return <Loading />;
}
