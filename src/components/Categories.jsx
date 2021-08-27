import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function Categories({ categories, onClick }) {
  return (
    <section>
      {
        categories.map(({ strCategory }, index) => (
          <Button
            key={ index + 1 }
            variant="light"
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => onClick(strCategory) }
          >
            { strCategory }
          </Button>
        ))
      }
    </section>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
