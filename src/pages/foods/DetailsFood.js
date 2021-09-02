import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Ingredients from '../../components/Ingredients';
import Instructions from '../../components/Instructions';
import Video from '../../components/Video';
import RecomendationsDrinks from '../../components/RecomendationsDrinks';
import ShareButton from '../../components/shareButton';
import fetchRecipes from '../../Redux/actions/fetchRecipes';
import fetchDrinks from '../../Redux/actions/fetchDrinks';
import './style.css';

class DetailsFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      red: false,
    };
    this.setRedirect = this.setRedirect.bind(this);
  }

  componentDidMount() {
    const { fetchRecipe, match, setDrinks } = this.props;
    const { params: { id } } = match;
    fetchRecipe(id);
    setDrinks();
  }

  setRedirect() {
    const { red } = this.state;
    this.setState({
      red: !red,
    });
  }

  render() {
    const { recipe, match } = this.props;
    const { params: { id } } = match;
    const { red } = this.state;
    return (
      <div>
        <div>
          {
            recipe.map(({ strMeal, strCategory, strMealThumb }, index) => (
              <div key={ index }>
                <div>
                  <img
                    className="img-details"
                    data-testid="recipe-photo"
                    src={ strMealThumb }
                    alt="foto"
                  />
                </div>
                <div>
                  <h1 data-testid="recipe-title">{ strMeal }</h1>
                  <h2 data-testid="recipe-category">{ strCategory }</h2>
                </div>
                <Ingredients />
                <Instructions />
                <Video />
                <RecomendationsDrinks />
                <button
                  className="start-recipe-button"
                  type="button"
                  data-testid="start-recipe-btn"
                  onClick={ () => this.setRedirect() }
                >
                  Iniciar Receita
                </button>
                <ShareButton />
                {}
              </div>
            ))
          }
          {
            red ? <Redirect to={ `/comidas/${id}/in-progress` } /> : console.log('chamou')
          }
        </div>
      </div>
    );
  }
}

DetailsFood.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
  drinks: state.drinks.drinks,
});

const mapDispatchToProps = (dispach) => ({
  fetchRecipe: (id) => dispach(fetchRecipes(id)),
  setDrinks: () => dispach(fetchDrinks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsFood);
