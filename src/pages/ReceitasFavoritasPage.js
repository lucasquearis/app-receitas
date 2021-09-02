import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, FavoriteRecipeCard, FilteringButtons } from '../components';
import AppContext from '../context/AppContext';
import '../styles/receitasFavoritasPage.css';

export default function ReceitasFavoritasPage() {
  const [idDetails, setIdDetails] = useState(null);
  const [typeDetails, setTypeDetails] = useState(null);
  const [redirectToDetails, setRedirectToDetails] = useState(false);
  const { filterRecipes } = useContext(AppContext);

  useEffect(() => {
    if (idDetails) {
      setRedirectToDetails(true);
    }
  }, [idDetails]);

  if (redirectToDetails) {
    return <Redirect to={ `${typeDetails}s/${idDetails}` } />;
  }

  const fvtRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const fvtRecipesResult = (filterType, array) => {
    if (filterType === 'all') {
      return array;
    }
    const result = array
      .filter((recipe) => recipe.type === filterType);
    return result;
  };

  return (
    <div>
      <Header title="Receitas Favoritas" showSearchIcon={ false } />
      <main className="main-bkc receitas-favoritas-page">
        <FilteringButtons />
        <section className="cards-area">
          { fvtRecipes && fvtRecipesResult(filterRecipes, fvtRecipes)
            .map((recipe, index) => (
              <FavoriteRecipeCard
                key={ recipe.id }
                id={ recipe.id }
                type={ recipe.type }
                index={ index }
                img={ recipe.image }
                name={ recipe.name }
                alcoholicOrNot={ recipe.alcoholicOrNot }
                area={ recipe.area }
                category={ recipe.category }
                setIdDetails={ setIdDetails }
                setTypeDetails={ setTypeDetails }
              />
            ))}
        </section>
      </main>
    </div>
  );
}
