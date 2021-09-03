import { useContext } from 'react';
import { fetchApiFilter, fetchApiRecipes } from '../Helpers/fetchApi';
import { ContextApp } from '../Context/ContextApp';

const CategoryHook = () => {
  const { setRecipes } = useContext(ContextApp);

  const handleCatClick = async (strCategory, cate) => {
    const res = await fetchApiFilter(strCategory, cate);
    setRecipes(res);
  };

  const resetFilter = async () => {
    const res = await fetchApiRecipes();
    setRecipes(res);
  };
  return { handleCatClick, resetFilter };
};

export default CategoryHook;
