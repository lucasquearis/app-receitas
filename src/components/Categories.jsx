import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function Categories({ categories, onClick }) {
  return (
    <section className="container mt-2">
      <div className="row-cols-3">
        {
          categories.map(({ strCategory }, index) => (
            <Button
              style={ { height: '60px' } }
              className="col border"
              variant="light"
              key={ index + 1 }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => onClick(strCategory) }
            >
              { strCategory }
            </Button>
          ))
        }
      </div>
    </section>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
