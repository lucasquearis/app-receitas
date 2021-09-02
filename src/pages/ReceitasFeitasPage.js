import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, DoneRecipeCard, FilteringButtons } from '../components';
import AppContext from '../context/AppContext';
import '../styles/receitasFeitasPage.css';

export default function ReceitasFeitasPage() {
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

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const doneRecipesResult = (filterType, array) => {
    if (filterType === 'all') {
      return array;
    }
    const result = array
      .filter((recipe) => recipe.type === filterType);
    return result;
  };

  return (
    <div>
      <Header title="Receitas Feitas" showSearchIcon={ false } />
      <main className="main-bkc receitas-feitas-page">
        <FilteringButtons />
        <section className="cards-area">
          { doneRecipes && doneRecipesResult(filterRecipes, doneRecipes)
            .map((recipe, index) => (
              <DoneRecipeCard
                key={ recipe.id }
                id={ recipe.id }
                type={ recipe.type }
                index={ index }
                img={ recipe.image }
                name={ recipe.name }
                alcoholicOrNot={ recipe.alcoholicOrNot }
                area={ recipe.area }
                category={ recipe.category }
                doneDate={ recipe.doneDate }
                tags={ recipe.tags }
                setIdDetails={ setIdDetails }
                setTypeDetails={ setTypeDetails }
              />
            ))}
        </section>
      </main>
    </div>
  );
}
