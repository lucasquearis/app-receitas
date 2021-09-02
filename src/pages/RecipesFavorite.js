import React, { Component } from 'react';
import FilterRecipesMade from '../components/FilterRecipesMade';
import RecipesFavoriteList from '../components/RecipesFavoriteList';

class RecipesFavorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doneRecipes: [],
    };

    this.setFavoriteRecipes = this.setFavoriteRecipes.bind(this);
    this.filterRecipesFavorite = this.filterRecipesFavorite.bind(this);
  }

  componentDidMount() {
    this.setFavoriteRecipes();
  }

  setFavoriteRecipes() {
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

  filterRecipesFavorite({ target }) {
    const filterType = target.innerText;

    switch (filterType) {
    case 'All':
      return this.setFavoriteRecipes();
    case 'Foods':
      this.setFavoriteRecipes();
      return this.setState((state) => ({
        doneRecipes: state.doneRecipes.filter(({ type }) => type === 'comida'),
      }));
    case 'Drinks':
      this.setFavoriteRecipes();
      return this.setState((state) => ({
        doneRecipes: state.doneRecipes.filter(({ type }) => type === 'bebida'),
      }));
    default:
      return this.setFavoriteRecipes();
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
        <FilterRecipesMade
          categories={ categories }
          handleClick={ this.filterRecipesFavorite }
        />
        <RecipesFavoriteList recipes={ doneRecipes } />
      </div>
    );
  }
}

export default RecipesFavorite;
