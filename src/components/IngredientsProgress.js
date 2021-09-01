import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import myContext from '../context/myContext';
import '../styles/IngredientsProgress.css';

export default function IngredientsProgress() {
  const {
    lists,
    objRecipeProgress,
    setObjRecipeProgress,
    updateLocalStore,
  } = useContext(myContext);
  const [trueOrFalse, setTrueOrFalse] = useState(false);
  const { id } = useParams();
  const { pathname } = useLocation();
  const text = pathname.includes('comidas') ? 'meals' : 'cocktails';

  useEffect(() => {
    if (Object.keys(objRecipeProgress[text]).length === 0) {
      setObjRecipeProgress({ ...objRecipeProgress,
        [text]:
          { ...objRecipeProgress[text],
            [id]: [...new Array(lists.ingredients.length).fill(false)] } });
    }
  }, [id, lists]);

  useEffect(() => {
    if (localStorage.inProgressRecipes) {
      const request = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (Object.keys(request[text]).includes(id)) setTrueOrFalse(request[text][id]);
    }
  }, []);

  useEffect(() => {
    const keysM = Object.keys(objRecipeProgress.meals).includes(id);
    const keysC = Object.keys(objRecipeProgress.cocktails).includes(id);
    if (keysM) setTrueOrFalse(objRecipeProgress[text][id]);
    if (keysC) setTrueOrFalse(objRecipeProgress[text][id]);
  }, [objRecipeProgress]);

  useEffect(() => {
    updateLocalStore();
  }, [setObjRecipeProgress, objRecipeProgress]);

  const handleUpdateValues = ({ target: { checked } }, key) => {
    const values = objRecipeProgress[text][id];
    values[key] = checked;
    setObjRecipeProgress(
      { ...objRecipeProgress,
        [text]: { ...objRecipeProgress[text],
          [id]: [...values] } },
    );
  };

  if (!lists && trueOrFalse.length === 0) return <p>Loading...</p>;
  return (
    <div className="ingredients-container">
      <h3 className="title-ingrendients">Ingredients</h3>
      <ul>
        {
          lists.ingredients.map((item, key) => (
            <li
              key={ key }
              data-testid={ `${key}-ingredient-step` }
              className={ String(trueOrFalse[key]) }
            >
              <input
                type="checkbox"
                name={ key }
                onChange={ (e) => handleUpdateValues(e, key) }
                checked={ trueOrFalse[key] }
              />
              { `${item} - ${lists.measure[key]}` }
            </li>
          ))
        }
      </ul>
    </div>
  );
}
