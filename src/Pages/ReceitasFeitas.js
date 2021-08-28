import React, { useState, useEffect } from 'react';
import copyToClipBoard from 'clipboard-copy';
import { Link } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import Header from '../Components/Header';

// const TESTE_STATE = [
//   {
//     id: '12545',
//     type: 'drink',
//     area: 'Japanese',
//     category: 'Chicken',
//     alcoholicOrNot: 'sake',
//     name: 'Teriyaki Chicken Casserole',
//     image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
//     doneDate: '27/08/2021',
//     tags: ['Meat', 'Casserole'],
//   },
//   {
//     id: '12546',
//     type: 'food',
//     area: 'Chines',
//     category: 'Chicken',
//     alcoholicOrNot: '',
//     name: 'Teriyaki Chicken Casserole',
//     image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
//     doneDate: '27/08/2021',
//     tags: ['Meat', 'Casserole'],
//   },
// ];

export default function ReceitasFeitas() {
  const [receitas, setReceitas] = useState([]);
  const [receitasFiltradas, setReceitasFiltradas] = useState([]);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    // localStorage.setItem('doneRecipes', JSON.stringify(TESTE_STATE));
    const getMeals = () => {
      const mealsLocal = JSON.parse(localStorage.getItem('doneRecipes'));
      if (mealsLocal !== null) {
        setReceitas(mealsLocal);
      }
    };
    getMeals();
  }, []);

  const renderFiltro = ({ target: { name } }) => {
    setFirstRender(false);
    if (name === 'all') {
      setReceitasFiltradas(receitas);
    } else if (name === 'food') {
      const filterFood = receitas.filter((receita) => receita.type === 'comida');
      setReceitasFiltradas(filterFood);
    } else {
      const filterDrinks = receitas.filter((receita) => receita.type === 'bebida');
      setReceitasFiltradas(filterDrinks);
    }
  };

  const verificaTipo = (receita, index) => {
    if (receita.type === 'comida') {
      return (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${receita.area} - ${receita.category}` }
        </p>);
    }
    return (
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${receita.area} - ${receita.alcoholicOrNot}` }
      </p>
    );
  };

  const urlType = (id, type) => {
    if (type === 'comida') {
      return `/comidas/${id}`;
    }
    return `/bebidas/${id}`;
  };

  const shareLink = (type, id) => {
    let url = `http://localhost:3000/bebidas/${id}`;
    if (type === 'comida') {
      url = `http://localhost:3000/comidas/${id}`;
      console.log('oiii');
    }
    copyToClipBoard(url);
  };

  const cardReceitas = (receita) => (
    <section key={ receita.index }>
      <Link to={ urlType(receita.id, receita.type) }>
        <img
          src={ receita.image }
          data-testid={ `${receita.index}-horizontal-image` }
          alt="img"
        />
      </Link>
      {
        verificaTipo(receita, receita.index)
      }
      <h2
        data-testid={ `${receita.index}-horizontal-name` }
      >
        {receita.name}
      </h2>
      <p
        data-testid={ `${receita.index}-horizontal-done-date` }
      >
        { receita.doneDate }
      </p>
      <button type="button" onClick={ () => shareLink(receita.type, receita.id) }>
        <img
          data-testid={ `${receita.index}-horizontal-share-btn` }
          alt="icon"
          src={ ShareIcon }
        />
      </button>
      { receita.tags.map((tag, index) => (
        <p key={ `${index} ${tag}` } data-testid={ `${receita.index}-${tag}-horizontal-tag` }>
          { tag }
        </p>
      ))}

    </section>
  );

  const renderMap = () => {
    if (firstRender) {
      return (
        receitas.map(
          (receita, index) => (
            cardReceitas({ ...receita, index })
          ),
        )
      );
    }
    return receitasFiltradas.map(
      (receita, index) => (
        cardReceitas({ ...receita, index })
      ),
    );
  };

  return (
    <>
      <section>
        <Header title="Receitas Feitas" />
      </section>
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ renderFiltro }
          name="all"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ renderFiltro }
          name="food"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ renderFiltro }
          name="drink"
        >
          Drinks
        </button>
      </section>
      <div>
        {
          renderMap()
        }
      </div>
    </>
  );
}
