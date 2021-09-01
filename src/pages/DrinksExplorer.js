import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer } from '../components';

const DrinksExplorer = () => {
  const history = useHistory();
  const [surprise, setSurprise] = useState('');

  const handleClickIngredients = () => {
    history.push('/explorar/bebidas/ingredientes');
  };

  const handleClickSurprise = () => {
    history.push(`/bebidas/${surprise}`);
  };

  useEffect(() => {
    const fetchRandom = async () => {
      try {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
        const { drinks } = await fetch(url).then((response) => response.json());
        setSurprise(drinks[0].idDrink);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRandom();
  }, []);

  return (
    <>
      <Header title="Explorar Bebidas" />
      <main className="button-container">
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-by-ingredient"
          onClick={ handleClickIngredients }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-surprise"
          onClick={ handleClickSurprise }
        >
          Me Surpreenda!
        </button>
        <Footer />
      </main>
    </>
  );
};

export default DrinksExplorer;
