import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';
import FoodImage from './foodImage';
import FooterMenu from '../../components/FooterMenu/FooterMenu';
import AppContext from '../../context/AppContext';
// import CardsList from '../../components/CardsList/CardsList';
// import requestFoodByIngredients from '../../services/requestFood';

const ExploreFoodIng = () => {
  const context = useContext(AppContext);
  const { ingredient, setIngredient } = context;
  const [foodIngredients, setFoodIngredients] = useState([]);
  const maxArray = 12;
  if (foodIngredients.length > maxArray) foodIngredients.length = maxArray;
  useEffect(() => {
    const ingredientAPI = async () => {
      const API = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const require = await fetch(API);
      const response = await require.json();
      const id = response.meals;
      setFoodIngredients(id);
    };
    ingredientAPI();
  }, []);

  const dishesByIngredient = async (obj) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${obj}`;
    // const dishesByIngredient = async () => {
    //   const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast';
    const require = await fetch(URL);
    const response = await require.json();
    const dishes = response.meals;
    console.log('teste1', dishes);
    setIngredient(dishes);
    // console.log('teste', ingredient);
  };

  console.log('verificador', ingredient);

  return (
    <div>
      <HeaderWithoutSearch>Explorar Ingredientes</HeaderWithoutSearch>
      <div>
        { foodIngredients.map((obj, index) => (
          <Link
            to="/comidas"
            onClick={ () => dishesByIngredient(obj.strIngredient) }
            key={ index }
          >
            <div
              key={ index }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ FoodImage(obj.strIngredient) }
                alt={ obj.strIngredient }
              />
              <h3 data-testid={ `${index}-card-name` }>{obj.strIngredient}</h3>
            </div>
          </Link>
        )) }
      </div>
      <FooterMenu />
    </div>
  );
};
export default ExploreFoodIng;
