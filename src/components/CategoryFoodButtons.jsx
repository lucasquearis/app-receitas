import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategory, clearSearch } from '../redux/actions/mainActions';
import myContext from '../context/myContext';
import ItemCard from './ItemCard';
import FoodsCard from './FoodsCard';
import '../styles/CategoryButtons.css';

function CategoryFoodButtons() {
  const cinco = 5;
  const doze = 12;
  const categories = useSelector((state) => state.reducerCategories.categories.meals);
  const {
    foodIngredientClick,
    foodIngredientSelected,
    setDisplay,
    display,
    removeDisplayList,
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
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setCategoryClick(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const displayCategory = async () => {
      const res = await foodIngredientClick(foodIngredientSelected);
      const { meals } = await res;
      setDisplay(meals.slice(0, doze));
      dispatch(clearSearch());
    };
    displayCategory();
    dispatch(fetchCategory());
    renderCategoryFilter();
  }, [dispatch]);

  const handleClick = (categoryStr) => {
    renderCategoryFilter(categoryStr);
    setLastClick(categoryStr);
    dispatch(clearSearch());
    removeDisplayList();
    showInputClick();
  };
  const handleClickAll = () => {
    setShowInput(true);
    removeDisplayList();
    display.length = 0;
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClickAll }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        categories && categories.map((category, index) => index < cinco && (
          <section key={ index } className="category-btn">
            <button
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
      {
        display.map((dish, index) => (
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
        showInput ? <FoodsCard /> : categoryClick.meals
        && categoryClick.meals.map((dish, index) => index < doze && (
          <ItemCard
            title={ dish.strMeal }
            thumb={ dish.strMealThumb }
            id={ dish.idMeal }
            index={ index }
            key={ index }
            to={ `comidas/${dish.idMeal}` }
          />
        ))
      }
    </div>
  );
}

export default CategoryFoodButtons;
