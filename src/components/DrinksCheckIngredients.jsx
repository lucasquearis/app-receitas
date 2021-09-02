import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCocktail from '../Redux/actions/fetchCocktail';
import initialStorage from '../webStorage/helper';
import '../pages/drinks/style.css';

class DrinkscheckIngredients extends Component {
  constructor(props) {
    super(props);
    this.getprogress = this.getprogress.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.taskItem = this.taskItem.bind(this);
    this.setIngredientsDrinks = this.setIngredientsDrinks.bind(this);
  }

  componentDidMount() {
    this.getprogress();
  }

  getprogress() {
    const { id } = this.props;
    const localProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localProgress !== null) {
      const nodeList = document.querySelectorAll('.itenLits');
      console.log(localProgress);
      const drinkId = localProgress.cocktails[id];
      nodeList.forEach((element, index) => {
        if (element.firstElementChild.value === drinkId[index]) {
          element.className = 'complete';
          element.firstElementChild.setAttribute('checked', true);
        }
      });
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialStorage));
    }
  }

  setIngredientsDrinks() {
    const { cocktail } = this.props;
    const object = cocktail[0];
    const keys = Object.keys(object);
    const values = Object.values(object);

    const ingredientsKeys = keys.filter((item, index) => (
      item.includes('strIngredient') && values[index] !== null
      && item.includes('strIngredient') && values[index] !== ''
    ));

    const measurementsKeys = keys.filter((item, index) => (
      item.includes('strMeasure') && values[index] !== null
      && item.includes('strMeasure') && values[index] !== ''
    ));

    return ingredientsKeys.reduce((acc, curr, index) => (
      [
        ...acc,
        {
          [object[curr]]: object[measurementsKeys[index]],
        },
      ]
    ), []);
  }

  setLocalStorage() {
    const { id } = this.props;
    const progress = document.querySelectorAll('.complete');
    const localprogress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const result = [];
    progress.forEach((element) => result.push(element.firstElementChild.value));
    const progressObject = {
      ...localprogress,
      cocktails: {
        ...localprogress.cocktails,
        [id]: [...result],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
  }

  taskItem(event) {
    const { target: { checked } } = event;
    if (checked) {
      event.target.parentNode.className = 'complete';
    }
    if (!checked) {
      event.target.parentNode.className = '';
    }
    this.setLocalStorage();
  }

  render() {
    const ingredients = this.setIngredientsDrinks();
    return (
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <h3
              id="check"
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className="itenLits"
            >
              <input
                key={ index }
                index={ index }
                type="checkbox"
                value={ `${Object.keys(ingredient)[0]}` }
                meansure={ `${Object.values(ingredient)[0]}` }
                onClick={ (e) => this.taskItem(e) }
              />
              {
                `${Object.keys(ingredient)[0]}:
                ${Object.values(ingredient)[0]}`
              }
            </h3>
          ))
        }
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  cocktail: state.drinks.cocktails,
});

const mapDispatchToProps = (dispach) => ({
  fetchCocktail: (id) => dispach(fetchCocktail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkscheckIngredients);

DrinkscheckIngredients.propTypes = {
  cocktail: PropTypes.objectOf(PropTypes.object),
}.isRequired;
