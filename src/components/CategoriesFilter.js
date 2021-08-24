import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CategoriesFilter extends Component {
  render() {
    const { categories } = this.props;
    // console.log(categories);
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

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
});

CategoriesFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(CategoriesFilter);
