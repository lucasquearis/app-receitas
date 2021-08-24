import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchMealsCategories from '../../Redux/actions/fetchMealsCategories';
import fetchMeals from '../../Redux/actions/fetchMeals';
import CategoriesFilter from '../../components/CategoriesFilter';
import RecipesList from '../../components/RecipesList';

class Foods extends Component {
  componentDidMount() {
    const { setMealsCategories, setMeals } = this.props;

    setMealsCategories();
    setMeals();
  }

  render() {
    const { meals, mealCategories } = this.props;

    return (
      <div>
        <CategoriesFilter categories={ mealCategories } />
        <RecipesList recipes={ meals } type="foods" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setMealsCategories: () => dispatch(fetchMealsCategories()),
  setMeals: () => dispatch(fetchMeals()),
});

const mapStateToProps = (state) => ({
  meals: state.foods.meals,
  mealCategories: state.foods.categories,
});

Foods.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object),
  mealCategories: PropTypes.arrayOf(PropTypes.object),
  setCategories: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
