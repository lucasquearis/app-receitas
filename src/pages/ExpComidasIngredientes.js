import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import * as fetchAPI from '../service/fetchAPI';

function ExpComidasIngredientes() {
  const MAX_RECIPES = 12;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAPI.fetchRecipeByIngredient().then(({ meals }) => setData(meals));
  }, []);

  return (
    <div>
      <Header titulo="Explorar Ingredientes" />
      <div className="card-container">
        { data.map(({ strIngredient, idIngredient }, index) => {
          if (index < MAX_RECIPES) {
            return (
              <Link key={ idIngredient } to={ `/comidas/${''}` } className="card">
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
      <Footer />
    </div>
  );
}

export default ExpComidasIngredientes;
