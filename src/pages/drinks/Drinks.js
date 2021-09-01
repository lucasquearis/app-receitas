import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardsList from '../../components/CardsList/CardsList';
import Header from '../../components/header/Header';
import { actionRequestItems, actionRequestSuccess } from '../../actions';
import { fetchApi } from '../../components/SearchBar/utils';
import CategoriesFilterButtons from
  '../../components/FilterCategoriesButtons.js/CategoriesFilterButtons';
import FooterMenu from '../../components/FooterMenu/FooterMenu';
import AppContext from '../../context/AppContext';

const Drinks = () => {
  const context = useContext(AppContext);
  const { ingredient } = context;
  console.log('verificador de ing', ingredient);
  const [erro, setErro] = useState(false);
  const { items } = useSelector((state) => state.itemsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      dispatch(actionRequestItems());
      try {
        const { drinks } = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        dispatch(actionRequestSuccess(drinks));
      } catch (error) {
        setErro(true);
        console.log(`Erro ao carregar as primeiras receitas: ${error}`);
      }
    };
    fetchItems();
  }, [dispatch]);

  if (erro) return <p>Algo deu errado. Tente novamente.</p>;
  if (ingredient.length > 0) {
    return (
      <div>
        <Header>Comidas</Header>
        <CategoriesFilterButtons />
        <CardsList array={ ingredient } teste="recipe-card" />
      </div>
    );
  }
  if (items.length > 0) {
    return (
      <div>
        <Header>Bebidas</Header>
        <CategoriesFilterButtons />
        <CardsList array={ items } teste="recipe-card" />
      </div>
    );
  }
  return (
    <div>
      <Header>Bebidas</Header>
      <FooterMenu />
    </div>
  );
};

export default Drinks;
