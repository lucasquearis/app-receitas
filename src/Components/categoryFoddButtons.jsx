import React, { useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesFood } from '../Redux/actions/categorieButtonsAct';

function CategoryFoodButtons() {
  const { foodcategories: { foodCategories, isLoading } } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesFood());
  }, [dispatch]);

  if (!isLoading) {
    return (
      <session>
        { foodCategories.map((category) => (
          <button
            type="button"
            key={ category.idCategory }
            onClick={ () => {} }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }
          </button>
        ))}
        <button
          type="button"
          key="6"
          onClick={ () => {} }
          data-testid="All-category-filter"
        >
          All
        </button>
      </session>
    );
  }
  return <ReactBootstrap.Spinner animation="border" variant="danger" />;
}

export default CategoryFoodButtons;
