import React, { useEffect, useState, useContext } from 'react';
/* import Card from 'react-bootstrap/Card'; */
import { Redirect } from 'react-router-dom';
import CardList from '../components/CardList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import mainFetch from '../fetchs/mainFetch';
import loadMount from '../Functions/loadMount';
import MyContext from '../context/MyContext';

function ComidaIng() {
  const { setFilterByIng } = useContext(MyContext);
  const [ingredients, setIngredients] = useState();
  const [redirect, setRedirect] = useState({
    redirect: false,
  });
  const getIngredients = async () => {
    const list = await mainFetch('food', 'ingredients');
    const { meals } = list;
    const limitator = 12;
    const foods = meals.filter((food, index) => index < limitator);
    setIngredients(foods);
  };

  const getFoodById = async (ingredient) => {
    const list = await mainFetch('food', 'filterIngredient', ingredient);
    setFilterByIng({
      ...list,
    });
  };

  function onClick(event) {
    const { name } = event.target;
    setRedirect({
      redirect: true,
    });
    getFoodById(name);
  }

  useEffect(() => {
    getIngredients();
  }, []);

  if (redirect.redirect) return <Redirect to="/comidas" />;
  if (!ingredients) return loadMount('Explorar Ingredientes');
  return (
    <div>
      <Header titulo="Explorar Ingredientes" />
      <main className="pageComida">
        <div>
          <CardList
            list={ ingredients }
            apiType="Ingredient"
            page="comidas"
            onClick={ onClick }
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ComidaIng;
