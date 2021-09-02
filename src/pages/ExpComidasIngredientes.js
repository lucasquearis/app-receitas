import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import * as fetchAPI from '../service/fetchAPI';

function ExpComidasIngredientes() {
  const MAX_RECIPES = 12;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAPI.fetchRecipeByIngredient().then(({ meals }) => setData(meals))
      .then(setIsLoading(true));
  }, []);

  if (isLoading) {
    return (
      <div>
        <div className="card-container">
          { data.map(({ strIngredient, idIngredient }, index) => {
            if (index < MAX_RECIPES) {
              return (
                <Link
                  key={ idIngredient }
                  to={ { pathname: '/comidas', state: { ingredient: strIngredient } } }
                  className="card"
                >
                  <IngredientCard
                    thumb={ strIngredient }
                    name={ strIngredient }
                    index={ index }
                    type="themealdb"
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

export default ExpComidasIngredientes;
