import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import fetchFoods from '../fetchs/FetchFood';

function Categories({ list, callback, setLoading }) {
  const MAXIMUM_INDEX = 4;

  const handleCategoryButton = async ({ target }) => {
    setLoading(true);
    const value = target.innerText;
    const result = await fetchFoods('food', 'procuraComida', value);
    callback(result);
    setLoading(false);
  };

  return (
    <aside>
      <Button
        data-testid="All-category-filter"
        variant="dark"
        onClick={ handleCategoryButton }
      >
        All
      </Button>
      {
        list.map((item, index) => index > MAXIMUM_INDEX
        || (
          <Button
            data-testid={ `${item.strCategory}-category-filter` }
            key={ index }
            onClick={ handleCategoryButton }
          >
            { item.strCategory }
          </Button>
        ))
      }
    </aside>
  );
}

Categories.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  callback: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Categories;
