import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchRecipes from '../../Redux/actions/fetchRecipes';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import Instructions from '../../components/Instructions';
import FoodsCheckIngredients from '../../components/FoodsCheckIngredients';

class RecipesInProgress extends Component {
  componentDidMount() {
    const { match: { params: { id } }, fetchRecipe } = this.props;
    fetchRecipe(id);
  }

  render() {
    const { recipe } = this.props;
    return (
      <>
        {
          recipe.map(({ strMeal, strCategory, strMealThumb }, index) => (
            <div key={ index }>
              <div>
                <img
                  data-testid="recipe-photo"
                  src={ strMealThumb }
                  alt="foto da receita"
                  className="img-details"
                />
              </div>
              <div>
                <h2 data-testid="recipe-title">{strMeal}</h2>
                <h2 data-testid="recipe-category">{ strCategory }</h2>
              </div>
              <div>
                <button
                  type="button"
                  className="share-fill"
                >
                  <img
                    src={ ShareIcon }
                    alt="share button"
                    data-testid="share-btn"
                  />
                </button>
                <button type="button" className="share-fill">
                  <img
                    src={ WhiteHeartIcon }
                    alt="favorite button"
                    data-testid="favorite-btn"
                  />
                </button>
                <FoodsCheckIngredients />
              </div>
            </div>
          ))
        }
        <Instructions />
        <buttons
          className="btn btn-warning"
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar a receita
        </buttons>
      </>
    );
  }
}

const mapDispatchToProps = (dispach) => ({
  fetchRecipe: (id) => dispach(fetchRecipes(id)),
});

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
});

RecipesInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(RecipesInProgress);
