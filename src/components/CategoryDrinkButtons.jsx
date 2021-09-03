import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import myContext from '../context/myContext';
import { fetchDrinksCategories, clearSearch } from '../redux/actions/mainActions';
import DrinksCard from './DrinksCard';
import ItemCard from './ItemCard';
import Loading from './Loading';

function CategoryDrinkButtons() {
  const doze = 12;
  const cinco = 5;
  const {
    drinkIngredientClick,
    drinkIngredientSelected,
    setDisplay,
    display,
    removeDisplayList,
    setDrinkIngredientSelected,
  } = useContext(myContext);
  const categories = useSelector(
    (state) => state.reducerCategories.drinksCategories.drinks,
  );
  const loading = useSelector(
    (state) => state.reducerCategories.isLoading,
  );
  const dispatch = useDispatch();
  const [categoryClick, setCategoryClick] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [lastClick, setLastClick] = useState('');

  const showInputClick = () => {
    setShowInput((prevCheck) => !prevCheck);
  };

  const filterDrinkCategory = async (category) => {
    try {
      const res = await
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await res.json();
      setCategoryClick(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const displayCategory = async () => {
      if (drinkIngredientSelected !== '') {
        const res = await drinkIngredientClick(drinkIngredientSelected);
        const { drinks } = await res;
        setDisplay(drinks.slice(0, doze));
        dispatch(clearSearch());
        setShowInput(false);
      }
    };
    displayCategory();
    dispatch(fetchDrinksCategories());
    filterDrinkCategory();
    drinkIngredientClick();
  }, [dispatch]);

  const handleClick = (categoryStr) => {
    filterDrinkCategory(categoryStr);
    setLastClick(categoryStr);
    showInputClick();
    removeDisplayList();
    dispatch(clearSearch());
  };

  const handleClickAll = () => {
    setShowInput(true);
    removeDisplayList();
    setDrinkIngredientSelected('');
  };

  if (loading) return <Loading />;
  return (
    <div>
      <div className="div-categories-wrapper">
        <section className="category-btn">
          <button
            className="each-category"
            type="button"
            onClick={ handleClickAll }
            data-testid="All-category-filter"
          >
            All
          </button>
        </section>
        {
          categories && categories.map((category, index) => index < cinco && (
            <button
              className="each-category"
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
          ))
        }
        <div className="food-cards">
          {
            display.map((drink, index) => (
              <ItemCard
                title={ drink.strDrink }
                thumb={ drink.strDrinkThumb }
                data-testid={ `${index}-recipe-card` }
                id={ drink.idDrink }
                index={ index }
                key={ index }
                to={ `/bebidas/${drink.idDrink}` }
              />
            ))
          }
          { showInput
            ? <DrinksCard />
            : categoryClick.drinks
            && categoryClick.drinks.map((dish, index) => index < doze && (
              <ItemCard
                title={ dish.strDrink }
                data-testid={ `${index}-recipe-card` }
                thumb={ dish.strDrinkThumb }
                id={ dish.idDrink }
                index={ index }
                key={ index }
                to={ `/bebidas/${dish.idDrink}` }
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryDrinkButtons;
