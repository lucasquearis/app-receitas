import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import * as fetchAPI from '../service/fetchAPI';

function ExpBebidasIngredientes() {
  const MAX_RECIPES = 12;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAPI.fetchDrinkByIngredient().then(({ drinks }) => setData(drinks));
  }, []);

  return (
    <div>
      <Header titulo="Explorar Ingredientes" />
      <div className="card-container">
        { data.map(({ strIngredient1, idIngredient }, index) => {
          if (index < MAX_RECIPES) {
            return (
              <Link key={ idIngredient } to={ `/bebidas/${''}` } className="card">
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
      <Footer />
    </div>
  );
}

export default ExpBebidasIngredientes;