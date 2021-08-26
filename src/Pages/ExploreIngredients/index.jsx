import React, { useContext } from 'react';
import './style.css';

import { useHistory } from 'react-router-dom';
import Header from '../../Components/Header';
import IngredientCard from '../../Components/IngredientCard';
import BottomMenu from '../../Components/Footer/BottomMenu';
import { ContextApp } from '../../Context/ContextApp';

function ExploreIngredients() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const { ingredients, getIngredients } = useContext(ContextApp);
  getIngredients(pathname);
  return (
    <div>
      <Header
        title="Explorar Ingredientes"
        searchButton={ false }
      />
      <div className="ingredients-container">
        {ingredients.map((current, index) => (
          <IngredientCard
            key={ index }
            image={ current.image }
            name={ current.name }
            index={ index }
            handleClick={ () => history.push('/comidas') }
          />
        ))}
      </div>
      <BottomMenu />
    </div>
  );
}

export default ExploreIngredients;
