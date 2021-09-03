import React, { Component } from 'react';
import FilterRecipesMade from '../../components/FilterRecipesMade';
import Header from '../../components/Header';
import RecipesMadeList from '../../components/RecipesMadeList';

class FoodRecipesMade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doneRecipes: [],
    };

    this.setDoneRecipes = this.setDoneRecipes.bind(this);
    this.filterRecipesDone = this.filterRecipesDone.bind(this);
  }

  componentDidMount() {
    this.setDoneRecipes();
  }

  setDoneRecipes() {
    const recipes = [
      {
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];

    this.setState({ doneRecipes: recipes });
  }

  filterRecipesDone({ target }) {
    const filterType = target.innerText;

    switch (filterType) {
    case 'All':
      return this.setDoneRecipes();
    case 'Foods':
      this.setDoneRecipes();
      return this.setState((state) => ({
        doneRecipes: state.doneRecipes.filter(({ type }) => type === 'comida'),
      }));
    case 'Drinks':
      this.setDoneRecipes();
      return this.setState((state) => ({
        doneRecipes: state.doneRecipes.filter(({ type }) => type === 'bebida'),
      }));
    default:
      return this.setDoneRecipes();
    }
  }

  render() {
    const categories = [
      { strCategory: 'food', strName: 'Foods' },
      { strCategory: 'drink', strName: 'Drinks' },
    ];

    const { doneRecipes } = this.state;

    return (
      <div>
        <Header title="Receitas Feitas" showSearchBottom={ false } />
        <FilterRecipesMade
          categories={ categories }
          handleClick={ this.filterRecipesDone }
        />
        <RecipesMadeList recipes={ doneRecipes } />
      </div>
    );
  }
}

export default FoodRecipesMade;
