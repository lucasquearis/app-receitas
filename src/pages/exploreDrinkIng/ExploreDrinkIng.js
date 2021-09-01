import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';
// import CardsList from '../../components/CardsList/CardsList';
import FooterMenu from '../../components/FooterMenu/FooterMenu';
import DrinkImage from './DrinkImage';
import AppContext from '../../context/AppContext';
import './ExploreDrinkIng.css';

const ExploreDrinkIng = () => {
  const context = useContext(AppContext);
  const { setIngredient } = context;
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const maxArray = 12;
  if (drinkIngredients.length > maxArray) drinkIngredients.length = maxArray;
  useEffect(() => {
    const drinkAPI = async () => {
      const API = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const require = await fetch(API);
      const response = await require.json();
      const id = response.drinks;
      setDrinkIngredients(id);
    };
    drinkAPI();
  }, []);
  console.log(drinkIngredients);
  // console.log('teste', foodIngredients);
  const drinksByIngredient = async (obj) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${obj}`;

    const require = await fetch(URL);
    const response = await require.json();
    const dishes = response.drinks;
    console.log('testebebidas', dishes);
    setIngredient(dishes);
    // console.log('teste', ingredient);
  };

  return (
    <div>
      <HeaderWithoutSearch>Explorar Ingredientes</HeaderWithoutSearch>
      <div>
        { drinkIngredients.map((obj, index) => (
          <Link
            to="/bebidas"
            onClick={ () => drinksByIngredient(obj.strIngredient1) }
            key={ index }
          >
            <div
              className="exploreDrinkIng"
              key={ index }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                className="exploreDrinkIngImg"
                data-testid={ `${index}-card-img` }
                src={ DrinkImage(obj.strIngredient1) }
                alt={ obj.strIngredient1 }
              />
              <h3
                className="exploreDrinkIngText"
                data-testid={ `${index}-card-name` }
              >
                {obj.strIngredient1}
              </h3>

            </div>
          </Link>
        )) }
      </div>
      <FooterMenu />
    </div>
  );
};

export default ExploreDrinkIng;
