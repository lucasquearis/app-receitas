import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCategories from '../../Redux/actions/fetchCategories';
import CategoriesFilter from '../../components/CategoriesFilter';

class Foods extends Component {
  componentDidMount() {
    const { setCategories } = this.props;
    setCategories();
  }

  render() {
    return (
      <div>
        <CategoriesFilter />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCategories: () => dispatch(fetchCategories()),
});

Foods.propTypes = {
  setCategories: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Foods);
