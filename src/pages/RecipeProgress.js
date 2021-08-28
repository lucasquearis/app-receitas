import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import myContext from '../context/myContext';
import HeaderDetails from '../components/HeaderDetails';
import IngredientsStep from '../components/IngredientsProgress';
import Intructions from '../components/Intructions';
import ButtonFinish from '../components/ButtonFinish';
import { getMealsById } from '../services/mealAPI';
import { getDrinksById } from '../services/drinkAPI';

export default function RecipeProgress() {
  const { recipe, setRecipe, keyType, setKeysType, id, setId, keyProgress, setKeyProgress } = useContext(myContext);
  const { pathname } = useLocation();
  const [, type, idPath] = pathname.split('/');

  useEffect(() => {
    const getId = async () => {
      const opt1 = (type === 'comidas') ? 'meals' : 'drinks';
      const opt2 = opt1 === 'meals' ? 'meals' : 'cocktails';
      const result = (type === 'comidas')
        ? await getMealsById(idPath) : await getDrinksById(idPath);
      setRecipe(result[opt1][0]);
      setKeysType(opt1);
      setId(idPath);
      setKeyProgress(opt2);
    };
    getId();
  }, []);

  return (
    <section>
      <HeaderDetails recipe={ recipe } keyType={ keyType } />
      <IngredientsStep />
      <Intructions recipe={ recipe } />
      <ButtonFinish />

    </section>
  );
}
