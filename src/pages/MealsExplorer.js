import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer } from '../components';

const MealsExplorer = () => {
  const history = useHistory();
  const [surprise, setSurprise] = useState('');

  const handleClickIngredients = () => {
    history.push('/explorar/comidas/ingredientes');
  };

  const handleClickArea = () => {
    history.push('/explorar/comidas/area');
  };

  const handleClickSurprise = () => {
    history.push(`/comidas/${surprise}`);
  };

  useEffect(() => {
    const fetchRandom = async () => {
      try {
        const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
        const { meals } = await fetch(url).then((response) => response.json());
        setSurprise(meals[0].idMeal);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRandom();
  }, []);

  return (
    <div>
      <Header title="Explorar Comidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ handleClickIngredients }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ handleClickArea }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleClickSurprise }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
};

export default MealsExplorer;
