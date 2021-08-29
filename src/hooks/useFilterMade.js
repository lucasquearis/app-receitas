import { useEffect, useState } from 'react';

// const doneRecipes = [
//   {
//     id: '52771',
//     type: 'comida',
//     area: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'bebida',
//     area: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];

function useFilterMade() {
  const [madeRecipes, setMadeRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  // const [done, setDone] = useState(doneRecipes);

  useEffect(() => {
    const getMadeRecipes = async () => {
      const recipes = await JSON.parse(localStorage.getItem('doneRecipes'));
      setMadeRecipes(recipes);
    };
    getMadeRecipes();
  }, []);

  // useEffect(() => {
  //   const recipes = async () => {
  //     const doneRecipes = [
  //       {
  //         id: '52771',
  //         type: 'comida',
  //         area: 'Italian',
  //         category: 'Vegetarian',
  //         alcoholicOrNot: '',
  //         name: 'Spicy Arrabiata Penne',
  //         image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //         doneDate: '23/06/2020',
  //         tags: ['Pasta', 'Curry'],
  //       },
  //       {
  //         id: '178319',
  //         type: 'bebida',
  //         area: '',
  //         category: 'Cocktail',
  //         alcoholicOrNot: 'Alcoholic',
  //         name: 'Aquamarine',
  //         image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //         doneDate: '23/06/2020',
  //         tags: [],
  //       },
  //     ];
  //     await setMadeRecipes(doneRecipes);
  //     console.log('inicial:', madeRecipes);
  //   };
  //   recipes();
  // }, []);

  useEffect(() => {
    const filters = async () => {
      const recipes = await JSON.parse(localStorage.getItem('doneRecipes'));
      console.log('entrou');
      if (recipes !== null) {
        let cardsFiltered = [...recipes];
        console.log('update1:', cardsFiltered);
        if (filter !== 'all') {
          cardsFiltered = cardsFiltered.filter(({ type }) => type === filter);
        }
        setMadeRecipes(cardsFiltered);
        console.log('update:', cardsFiltered);
      } else {
        setMadeRecipes([]);
      }
    };

    filters();
  }, [filter]);

  return {
    madeRecipes,
    filter,
    setFilter,
  };
}

export default useFilterMade;
