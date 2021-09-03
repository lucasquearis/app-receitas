import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategory, clearSearch } from '../redux/actions/mainActions';
import myContext from '../context/myContext';
import ItemCard from './ItemCard';
import FoodsCard from './FoodsCard';
import Loading from './Loading';

function CategoryFoodButtons() {
  const cinco = 5;
  const doze = 12;
  const categories = useSelector(
    (state) => state.reducerCategories.categories
      .meals,
  );
  const loading = useSelector(
    (state) => state.reducerCategories.isLoading,
  );
  const {
    foodIngredientClick,
    foodIngredientSelected,
    setDisplayFood,
    displayFood,
    removeDisplayList,
    setFoodIngredientSelected,
  } = useContext(myContext);
  const dispatch = useDispatch();
  const [categoryClick, setCategoryClick] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [lastClick, setLastClick] = useState('');

  const showInputClick = () => {
    setShowInput((prevCheck) => !prevCheck);
  };

  const renderCategoryFilter = async (category) => {
    try {
      const response = await
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setCategoryClick(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const displayCategory = async () => {
      if (foodIngredientSelected !== '') {
        const res = await foodIngredientClick(foodIngredientSelected);
        const { meals } = res;
        setDisplayFood(meals.slice(0, doze));
        dispatch(clearSearch());
        setShowInput(false);
      }
    };
    displayCategory();
    dispatch(fetchCategory());
    renderCategoryFilter();
    foodIngredientClick();
  }, [dispatch]);

  const handleClick = (categoryStr) => {
    renderCategoryFilter(categoryStr);
    setLastClick(categoryStr);
    showInputClick();
    removeDisplayList();
    dispatch(clearSearch());
  };

  const handleClickAll = () => {
    setShowInput(true);
    removeDisplayList();
    setFoodIngredientSelected('');
  };
  if (loading) return <Loading />;
  return (
    <div>
      <div className="div-categories-wrapper">
        <section className="category-btn">
          <button
            className="each-category-btn"
            type="button"
            onClick={ handleClickAll }
            data-testid="All-category-filter"
          >
            All
          </button>
        </section>
        {
          categories && categories.map((category, index) => index < cinco && (
            <section key={ index } className="category-btn">
              <button
                className="each-category-btn"
                type="button"
                key={ `${category.strCategory}-category-filter` }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ () => {
                  handleClick(category.strCategory);
                  if (category.strCategory === lastClick) {
                    setShowInput(true);
                  } else {
                    setShowInput(false);
                  }
                } }
              >
                {category.strCategory}
              </button>
            </section>
          ))
        }
        <div className="food-cards">
          {
            displayFood.map((dish, index) => (
              <ItemCard
                title={ dish.strMeal }
                thumb={ dish.strMealThumb }
                data-testid={ `${index}-recipe-card` }
                id={ dish.idMeal }
                index={ index }
                key={ index }
                to={ `/bebidas/${dish.idMeal}` }
              />
            ))
          }
          {
            showInput
              ? <FoodsCard />
              : categoryClick.meals
            && categoryClick.meals.map((dish, index) => index < doze && (
              <ItemCard
                title={ dish.strMeal }
                thumb={ dish.strMealThumb }
                data-testid={ `${index}-recipe-card` }
                id={ dish.idMeal }
                index={ index }
                key={ index }
                to={ `comidas/${dish.idMeal}` }
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default CategoryFoodButtons;
