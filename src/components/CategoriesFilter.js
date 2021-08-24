import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoriesFilter extends Component {
  constructor(props) {
    super(props);

    this.filterFiveCategories = this.filterFiveCategories.bind(this);
  }

  filterFiveCategories() {
    const { categories } = this.props;
    const FIVE = 5;

    return categories.filter((_categories, index) => index < FIVE);
  }

  render() {
    const { handleClick } = this.props;
    const categories = this.filterFiveCategories();

    return (
      <div>
        {
          categories.map(({ strCategory }) => (
            <button
              key={ strCategory }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ handleClick }
            >
              { strCategory }
            </button>
          ))
        }
      </div>
    );
  }
}

CategoriesFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default CategoriesFilter;
