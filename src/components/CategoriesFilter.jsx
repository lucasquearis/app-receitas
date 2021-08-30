import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/categoryStyle.css';

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
    const filteredCategories = this.filterFiveCategories();

    return (
      <div className="categoryStyle">
        <button
          className="btn btn-warning "
          type="button"
          data-testid="All-category-filter"
          onClick={ handleClick }
        >
          All
        </button>
        {
          filteredCategories.map(({ strCategory }) => (
            <button
              className="btn btn-warning "
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
