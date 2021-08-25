import React, { useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesFood } from '../Redux/actions/categorieButtonsAct';

function CategoryFoodButtons() {
  const { categories, isLoading } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesFood());
  });

  if (!isLoading) {
    console.log(categories);
    return (
      <session>
        { categories.map((category) => (
          <button
            type="button"
            key={ category.idCategory }
            onClick={ () => {} }
          >
            { category.strCategory }
          </button>
        ))}
      </session>
    );
  }
  return <ReactBootstrap.Spinner animation="border" variant="danger" />;
}

export default CategoryFoodButtons;
