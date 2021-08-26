import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionRequestItems, actionRequestSuccess } from '../../actions';
import CardsList from '../../components/CardsList/CardsList';
import CategoriesFilterButtons from
  '../../components/FilterCategoriesButtons.js/CategoriesFilterButtons';
import Header from '../../components/header/Header';
import { fetchApi } from '../../components/SearchBar/utils';

const Food = () => {
  const [erro, setErro] = useState(false);
  const { items } = useSelector((state) => state.itemsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      dispatch(actionRequestItems());
      try {
        const { meals } = await fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        dispatch(actionRequestSuccess(meals));
      } catch (error) {
        setErro(true);
        console.log(`Erro ao carregar as primeiras receitas: ${error}`);
      }
    };
    fetchItems();
  }, [dispatch]);

  if (erro) return <p>Algo deu errado. Tente novamente.</p>;
  if (items.length > 0) {
    return (
      <div>
        <Header>Comidas</Header>
        <CategoriesFilterButtons />
        <CardsList array={ items } />
      </div>
    );
  }
  return (
    <div>
      <Header>Comidas</Header>
    </div>
  );
};

export default Food;
