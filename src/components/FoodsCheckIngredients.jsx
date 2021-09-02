import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchRecipes from '../Redux/actions/fetchRecipes';
import '../pages/foods/style.css';
import initialStorage from '../webStorage/helper';

class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.getprogress = this.getprogress.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.taskItem = this.taskItem.bind(this);
    this.setIngredients = this.setIngredients.bind(this);
  }

  componentDidMount() {
    this.getprogress();
  }

  getprogress() {
    const { id } = this.props;
    const localProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localProgress !== null) {
      const nodeList = document.querySelectorAll('.itenLits');
      const mealId = localProgress.meals[id];
      nodeList.forEach((element, index) => {
        if (element.firstElementChild.value === mealId[index]) {
          element.className = 'complete';
          element.firstElementChild.setAttribute('checked', true);
        }
      });
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialStorage));
    }
  }

  setIngredients() {
    const { recipe } = this.props;
    const object = recipe[0];
    const keys = Object.keys(object);
    const values = Object.values(object);

    const ingredientsKeys = keys.filter((item, index) => (
      item.includes('strIngredient') && values[index] !== ''
      && item.includes('strIngredient') && values[index] !== null
    ));

    const measurementsKeys = keys.filter((item, index) => (
      item.includes('strMeasure') && values[index] !== ' '
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
      meals: {
        ...localprogress.meals,
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
    const ingredients = this.setIngredients();
    return (
      <div>
        {
          ingredients.map((ingredient, index) => (
            <h2
              id="iten"
              key={ index }
              value={ `${Object.keys(ingredient)[0]}` }
              index={ index }
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
            </h2>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
});

const mapDispatchToProps = (dispach) => ({
  setRecipes: (id) => dispach(fetchRecipes(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);

Ingredients.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.object),
  setRecipe: PropTypes.func,
}.isRequired;
