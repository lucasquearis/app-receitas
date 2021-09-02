import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import * as fetchAPI from '../service/fetchAPI';

function ExpBebidasIngredientes() {
  const MAX_RECIPES = 12;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAPI.fetchDrinkByIngredient().then(({ drinks }) => setData(drinks))
      .then(setIsLoading(true));
  }, []);

  if (isLoading) {
    return (
      <div>
        <div className="card-container">
          { data.map(({ strIngredient1, idIngredient }, index) => {
            if (index < MAX_RECIPES) {
              return (
                <Link
                  key={ idIngredient }
                  to={ { pathname: '/bebidas', state: { ingredient: strIngredient1 } } }
                  className="card"
                >
                  <IngredientCard
                    thumb={ strIngredient1 }
                    name={ strIngredient1 }
                    index={ index }
                    type="thecocktaildb"
                  />
                </Link>
              );
            }
            return null;
          }) }
        </div>
        <Header titulo="Explorar Ingredientes" />
        <Footer />
      </div>
    );
  }

  return <div className="main-container"><div className="c-loader" /></div>;
}

export default ExpBebidasIngredientes;
