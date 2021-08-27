import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
// import '../styles/Explorer.css';

function ExplorerFoods() {
  const history = useHistory();
  const [id, setId] = useState();
  useEffect(() => {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    try {
      const fetchRandomFood = async () => {
        const randomFood = await fetch(url);
        const response = await randomFood.json();
        setId(response.meals[0].idMeal);
      };
      fetchRandomFood();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Header />
      <button
        type="button"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explorar/comidas/area') }
        data-testid="explore-by-area"
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        onClick={ () => history.push(`/comidas/${id}`) }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
      <FooterMenu />
    </div>
  );
}

export default ExplorerFoods;
