import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchMealsByCategory from '../../Redux/actions/fetchMealsByCategory';
import fetchMealsCategories from '../../Redux/actions/fetchMealsCategories';
import fetchMeals from '../../Redux/actions/fetchMeals';
import CategoriesFilter from '../../components/CategoriesFilter';
import RecipesList from '../../components/RecipesList';
import Header from '../../components/Header';
import MenuFooter from '../../components/MenuFooter';

class Foods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredCategory: 'All',
    };

    this.setMealCategory = this.setMealCategory.bind(this);
    this.filterMealsByCategory = this.filterMealsByCategory.bind(this);
  }

  componentDidMount() {
    const { setMeals, setMealsCategories } = this.props;

    setMealsCategories();
    setMeals();
  }

  setMealCategory(filteredCategory) {
    this.setState({ filteredCategory });
  }

  filterMealsByCategory({ target }) {
    const { setMeals, setMealsByCategory } = this.props;
    const { filteredCategory } = this.state;
    const category = target.innerText;

    if (category !== 'All') {
      if (category === filteredCategory) {
        setMeals();
        this.setMealCategory('All');
      } else {
        setMealsByCategory(category);
        this.setMealCategory(category);
      }
    } else {
      setMeals();
      this.setMealCategory(category);
    }
  }

  render() {
    const { meals, mealCategories } = this.props;

    return (
      <div>
        <Header title="Comidas" />
        <CategoriesFilter
          categories={ mealCategories }
          handleClick={ this.filterMealsByCategory }
        />
        <RecipesList recipes={ meals } type="foods" />
        <MenuFooter />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setMealsByCategory: (value) => dispatch(fetchMealsByCategory(value)),
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
