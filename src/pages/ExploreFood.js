import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
// import { useSelector } from 'react-redux';

function ExploreFood() {
  const [apiFood, setApiFood] = useState([]);
  // const [foodSurprise, setFoodSurprise] = useState([])

  useEffect(() => {
    const getApiFood = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const { meals } = await response.json();
        setApiFood(meals);
      }
      catch (error){
        console.log(error);
      }
    };
    getApiFood();
  }, []);

  // useEffect(() => {
  //   const getSurpriseFood = apiFood.map((food) => (
  //     <div>{ food.strMeal }</div>
  //   ))
  //   setFoodSurprise(getSurpriseFood);
  // }, [apiFood])

  return (
    <div>
      <Header title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button data-testid="explore-by-area">
          Por Local de Origem
        </button>
      </Link>
      { apiFood[0] && <Link to={ `/comidas/${apiFood[0].idMeal}` }>
        <button
          data-testid="explore-surprise"
          >
          Me Surpreenda!
        </button>
      </Link> }
    </div>
  );
}



export default ExploreFood;
