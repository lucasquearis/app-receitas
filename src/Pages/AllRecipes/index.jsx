import React, { useContext } from 'react';
// import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ContextApp } from '../../Context/ContextApp';
import Header from '../../Components/Header';
import RecipesContainer from '../../Components/RecipesContainer';
import Footer from '../../Components/Footer/BottomMenu';
import BtnCategory from '../../Components/BtnCategory';

function AllRecipes() {
  // const { categoryMeal, setRecipes, categoryDrinks, recipes } = useContext(ContextApp);
  const { categoryMeal, categoryDrinks } = useContext(ContextApp);

  const history = useHistory();
  const { location: { pathname } } = history;
  const currentRout = pathname.includes('/comidas');
  // esta logica é a que realiza a requisição de receitas para quando a rota /comidas ou /bebidas é acessada, foi movida para contextApp para ser realizada quando a aplicação iniciar
  // useEffect(() => {
  //   const urlRender = currentRout ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';
  //   const fetchApi = async (url, type, searchInput = '') => {
  //     const request = await fetch(`${url}${type}${searchInput}`);
  //     const response = await request.json();
  //     return setRecipes(response.meals || response.drinks);
  //   };
  //   if (recipes.length === 0) {
  //     fetchApi(urlRender, 'search.php?s=');
  //   }
  // }, [recipes, setRecipes, currentRout]);

  return (
    <div>
      <Header title={ currentRout ? 'Comidas' : 'Bebidas' } />
      <BtnCategory
        category={ currentRout ? categoryMeal : categoryDrinks }
      />
      <RecipesContainer />
      <Footer />
    </div>
  );
}

export default AllRecipes;
