import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionRequestItems, actionRequestSuccess } from '../../actions';
import { fetchApi } from '../SearchBar/utils';
import './CategoriesFilterButtons.css';

const CategoriesFilterButtons = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [erro, setErro] = useState(false);
  const [apiUrl, setApiUrl] = useState('');
  const dispatch = useDispatch();
  const categoriesQuantity = 5;
  // comentario

  useEffect(() => {
    const path = window.location.pathname;
    let type;
    if (path === '/comidas') {
      type = 'themealdb';
      setApiUrl('themealdb');
    }
    if (path === '/bebidas') {
      type = 'thecocktaildb';
      setApiUrl('thecocktaildb');
    }
    const fetchCategories = async () => {
      const response = await fetchApi(`https://www.${type}.com/api/json/v1/1/list.php?c=list`);
      const responseKey = Object.keys(response);
      if (response[responseKey].length > categoriesQuantity) {
        const categoriesArray = response[responseKey].slice(0, categoriesQuantity);
        setCategories(categoriesArray);
      }
    };
    fetchCategories();
  }, []);

  const fetchItems = async (apiURL) => {
    dispatch(actionRequestItems());
    try {
      const response = await fetchApi(`https://www.${apiURL}.com/api/json/v1/1/search.php?s=`);
      const responseKey = Object.keys(response);
      dispatch(actionRequestSuccess(response[responseKey]));
      setSelectedCategory('');
    } catch (error) {
      setErro(true);
      console.log(`Erro ao carregar as primeiras receitas: ${error}`);
    }
  };

  const handleClick = async (category, apiURl, { target: { innerHTML } }) => {
    if (innerHTML !== selectedCategory) {
      dispatch(actionRequestItems());
      const response = await fetchApi(`https://www.${apiURl}.com/api/json/v1/1/filter.php?c=${category}`);
      const responseKey = Object.keys(response);
      console.log(response[responseKey]);
      dispatch(actionRequestSuccess(response[responseKey]));
      setSelectedCategory(category);
    } else {
      fetchItems(apiUrl);
    }
  };

  if (erro) return <p>Algo deu errado. Tente novamente.</p>;
  return (
    <div>
      <button
        className="buttonFilter"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => { fetchItems(apiUrl); } }
      >
        All
      </button>
      {
        categories.map((categorie, index) => {
          const name = Object.values(categorie);
          console.log('teste', name[0].split('/')[0]);
          return (
            <button
              className="buttonFilter"
              key={ index }
              data-testid={ `${categorie.strCategory}-category-filter` }
              type="button"
              onClick={
                (event) => handleClick(categorie.strCategory, apiUrl, event)
              }
            >
              {name[0].split('/')[0]}
            </button>);
        })
      }
    </div>
  );
};

export default CategoriesFilterButtons;
