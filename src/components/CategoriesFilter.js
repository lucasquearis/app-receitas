import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoriesFilter extends Component {
  render() {
    const { categories } = this.props;

    return (
      <div>
        {
          categories.map(({ strCategory }) => (
            <button
              key={ strCategory }
              type="button"
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
