import React, { useEffect, useContext } from 'react';
// import React from 'react';
import { useLocation } from 'react-router-dom';
import myContext from '../context/myContext';
import HeaderDetails from '../components/HeaderDetails';
import IngredientsStep from '../components/IngredientsProgress';
import Intructions from '../components/Intructions';
import { getMealsById } from '../services/mealAPI';
import { getDrinksById } from '../services/drinkAPI';
import ButtonFinish from '../components/ButtonFinish';

export default function RecipeProgress() {
  const { setRecipe, setKeysType } = useContext(myContext);
  const { pathname } = useLocation();
  const [, type, id] = pathname.split('/');

  useEffect(() => {
    const getId = async () => {
      const text = (type === 'comidas') ? 'meals' : 'drinks';
      const result = (type === 'comidas')
        ? await getMealsById(id) : await getDrinksById(id);
      setRecipe(result[text][0]);
      setKeysType(text);
    };
    getId();
  }, []);

  return (
    <section>
      <HeaderDetails />
      <IngredientsStep />
      <Intructions />
      <ButtonFinish />
    </section>
  );
}
