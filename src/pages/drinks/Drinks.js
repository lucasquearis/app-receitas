import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchDrinks from '../../Redux/actions/fetchDrinks';
import fetchDrinksByCategory from '../../Redux/actions/fetchDrinksByCategory';
import fetchDrinksCategories from '../../Redux/actions/fetchDrinksCategories';
import CategoriesFilter from '../../components/CategoriesFilter';
import RecipesList from '../../components/RecipesList';

class Drinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredCategory: 'All',
    }

    this.setDrinkCategory = this.setDrinkCategory.bind(this);
    this.filterMealsByCategory = this.filterMealsByCategory.bind(this);
  }

  componentDidMount() {
    const { setDrinks, setDrinksCategories } = this.props;

    setDrinks();
    setDrinksCategories();
  }

  setDrinkCategory(filteredCategory) {
    this.setState({ filteredCategory });
  }

  filterMealsByCategory({ target }) {
    const { setDrinks, setDrinksByCategory } = this.props;
    const { filteredCategory } = this.state;
    const category = target.innerText;

    if (category !== 'All') {
      if(category === filteredCategory) {
        setDrinks();
        this.setDrinkCategory('All');
      } else {
        setDrinksByCategory(category);
        this.setDrinkCategory(category);
      }
    } else {
      setDrinks();
      this.setDrinkCategory(category);
    }
  }

  render() {
    const { drinks, drinksCategories } = this.props;

    return (
      <div>
        <CategoriesFilter
          categories={ drinksCategories }
          handleClick={ this.filterMealsByCategory }
        />
        <RecipesList recipes={ drinks } type="drinks" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setDrinksByCategory: (value) => dispatch(fetchDrinksByCategory(value)),
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
