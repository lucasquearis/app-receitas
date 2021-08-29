import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import myContext from '../context/myContext';
import '../styles/IngredientsProgress.css';

export default function IngredientsProgress() {
  const { lists, objRecipeProgress, setObjRecipeProgress } = useContext(myContext);
  const [renderCheckbox, setRenderCheckbox] = useState({});
  const { id } = useParams();
  const { pathname } = useLocation();
  const text = pathname.includes('comidas') ? 'meals' : 'cocktails';

  useEffect(() => {
    const { meals } = objRecipeProgress;
    const { cocktails } = objRecipeProgress;
    const keysMeals = Object.keys(meals).includes(id);
    const keysCocktails = Object.keys(cocktails).includes(id);
    if (keysMeals) setRenderCheckbox(objRecipeProgress[text][id]);
    if (keysCocktails) setRenderCheckbox(objRecipeProgress[text][id]);
  }, [objRecipeProgress]);

  useEffect(() => {
    const func = () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(objRecipeProgress));
    };
    func();
  }, [objRecipeProgress]);

  const handleClassChange = ({ target: { name, checked } }) => {
    setObjRecipeProgress({ ...objRecipeProgress,
      [text]: { [id]: { ...objRecipeProgress[text][id], [name]: checked } } });
  };

  if (!lists) return '';
  return (
    <div className="ingredients-container">
      <h3 className="title-ingrendients">Ingredients</h3>
      <ul>
        {
          lists.ingredients.map((item, key) => (
            <li
              key={ key }
              data-testid={ `${key}-ingredient-step` }
            >
              <input
                type="checkbox"
                name={ key }
                onChange={ (e) => handleClassChange(e) }
                checked={ renderCheckbox[key] }
              />

              { `${item} - ${lists.measure[key]}` }
            </li>
          ))
        }
      </ul>
    </div>
  );
}
