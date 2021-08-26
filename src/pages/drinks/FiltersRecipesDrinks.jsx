import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { fetchCategoriesDrinksApi } from '../../services/fetchApi';
import { fetchRecipesForCategory } from '../../redux/actions';

function FiltersRecipesDrinks({ getCategory }) {
  const [categories, setCategories] = useState([]);
  const [isMouted, setisMouted] = useState(false);

  const getCategories = () => {
    const fetchCategories = async () => {
      const data = await fetchCategoriesDrinksApi();
      const FiveNumber = 5;
      const firstFivesCategories = data.filter((_item, index) => index < FiveNumber);
      setCategories(firstFivesCategories);
      setisMouted(true);
    };
    if (!isMouted) fetchCategories();
  };

  useEffect(getCategories);

  function handleClick({ target: { value } }) {
    getCategory(value);
  }

  return (
    <>
      {categories.map(({ strCategory }) => (
        <button
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          value={ strCategory }
          onClick={ handleClick }
        >
          {strCategory}
        </button>
      ))}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getCategory: (category) => dispatch(fetchRecipesForCategory(category)),
});

FiltersRecipesDrinks.propTypes = {
  getCategory: func.isRequired,
};

export default connect(null, mapDispatchToProps)(FiltersRecipesDrinks);
