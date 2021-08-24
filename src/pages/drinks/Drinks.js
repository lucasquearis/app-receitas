import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchDrinks from '../../Redux/actions/fetchDrinks';
import fetchDrinksCategories from '../../Redux/actions/fetchDrinksCategories';
import CategoriesFilter from '../../components/CategoriesFilter';
import RecipesList from '../../components/RecipesList';

class Drinks extends Component {
  componentDidMount() {
    const { setDrinks, setDrinksCategories } = this.props;

    setDrinks();
    setDrinksCategories();
  }

  render() {
    const { drinks, drinksCategories } = this.props;

    return (
      <div>
        <CategoriesFilter categories={ drinksCategories } />
        <RecipesList recipes={ drinks } type="drinks" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setDrinksCategories: () => dispatch(fetchDrinksCategories()),
  setDrinks: () => dispatch(fetchDrinks()),
});

const mapStateToProps = (state) => ({
  drinks: state.drinks.drinks,
  drinksCategories: state.drinks.categories,
});

Drinks.propTypes = {
  setDrinks: PropTypes.func,
  setDrinksCategories: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
