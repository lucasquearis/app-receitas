import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoodRedux } from '../redux/actions/foodActions';
import FoodsCards from '../components/FoodsCard';
import CategoryFoodBtn from '../components/CategoryFoodBtn';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Foods() {
  const dispatch = useDispatch();
  const foodsLimits = 12;
  // const [current, setCurrent] = useState('');
  const { meals } = useSelector((state) => state.foodsAndDrinks);
  // const { categories } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchFoodRedux);
    // dispatch(fetchFoodsCategoriesRedux);
  }, [dispatch]);

  const headerProps = {
    title: 'Comidas',
    renderSearchBar: true,
  };

  if (meals.length === 0) {
    return (
      <h1>Loading</h1>
    );
  }

  return (
    <>
      <Header { ...headerProps } />
      <div className="recipes-list">
        <CategoryFoodBtn />

        {meals.slice(0, foodsLimits).map(

          (food, id) => FoodsCards(
            food, 'comidas', id,
          ),
        )}
      </div>
      <Footer />
    </>
  );
}

export default Foods;
