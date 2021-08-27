import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinksRedux } from '../redux/actions/foodActions';
import DrinksCards from '../components/DrinksCard';
import CategoryDrinkBtn from '../components/CategoryDrinkBtn';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const dispatch = useDispatch();
  const drinksLimits = 12;
  // const [current, setCurrent] = useState('');
  const { drinks } = useSelector((state) => state.foodsAndDrinks);
  // const { categories } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchDrinksRedux);
    // dispatch(fetchDrinksCategoriesRedux);
  }, [dispatch]);

  const headerProps = {
    title: 'Bebidas',
    renderSearchBar: true,
  };

  if (drinks.length === 0) {
    return (
      <h1>Loading</h1>
    );
  }
  return (
    <>
      <Header { ...headerProps } />
      <div className="recipes-list">
        <CategoryDrinkBtn />

        {drinks.slice(0, drinksLimits).map(
          (drink, id) => DrinksCards(
            drink, 'bebidas', id,
          ),
        )}

      </div>
      <Footer />
    </>
  );
}

export default Drinks;
