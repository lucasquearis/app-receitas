import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { fetchAPIDetails } from '../services';
import { HeaderIngredientsInstructions } from '../components';
import FinishRecipeButton from '../components/FinishRecipeButton';
import Loading from '../components/Loading';
import '../styles/receitasEmProgressoPage.css';

export default function ReceitaEmProgressoPage() {
  const [loading, setLoading] = useState(true);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const pathnameAPI = pathname.match(/comidas|bebidas/)[0];
  const { setRecipeDetails } = useContext(AppContext);
  const [redirectToDone, setRedirectToDone] = useState(false);

  useEffect(() => {
    (async () => {
      const results = await fetchAPIDetails(`/${pathnameAPI}`, id);
      const result = results.meals || results.drinks;
      setRecipeDetails(result[0]);
      setLoading(false);
    })();
  }, [setRecipeDetails, id, pathnameAPI]);

  if (loading) return <Loading />;

  if (redirectToDone) return <Redirect to="/receitas-feitas" />;

  return (
    <section className="main-bkc receitas-in-progress-container">
      <HeaderIngredientsInstructions pathnameAPI={ pathnameAPI } id={ id } />
      <FinishRecipeButton
        setRedirectToDone={ setRedirectToDone }
      />
    </section>
  );
}
