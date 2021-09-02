import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import CardList from '../components/CardList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchFoods from '../fetchs/FetchFood';
import MyContext from '../context/MyContext';

function BebidasIng() {
  const { setFilterByIng } = useContext(MyContext);
  const [ingredients, setIngredients] = useState();
  const [redirect, setRedirect] = useState({
    redirect: false,
    path: '',
  });
  const getDrinks = async () => {
    const list = await fetchFoods('drink', 'ingredients');
    const { drinks } = list;
    const limitator = 12;
    const drinkList = drinks.filter((drink, index) => index < limitator);
    setIngredients(drinkList);
  };

  const getDrinkById = async (ingredient) => {
    const list = await fetchFoods('drink', 'filterIngredient', ingredient);
    setFilterByIng({
      ...list,
    });
  };

  function onClick(event) {
    const { name } = event.target;
    setRedirect({
      redirect: true,
      path: name,
    });
    getDrinkById(name);
  }

  useEffect(() => {
    getDrinks();
  }, []);

  if (redirect.redirect) return <Redirect to="/bebidas" />;
  if (!ingredients) return <p>Loading...</p>;
  return (
    <div>
      <Header titulo="Explorar Ingredientes" />
      <main className="pageComida">
        <div>
          <CardList
            list={ ingredients }
            apiType="Ingredient"
            page="bebidas"
            onClick={ onClick }
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BebidasIng;
