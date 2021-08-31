import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Ingredients from '../../components/Ingredients';
import Instructions from '../../components/Instructions';
import Video from '../../components/Video';
import Recomendations from '../../components/Recomendations';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import fetchRecipes from '../../Redux/actions/fetchRecipes';
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
    const { fetchRecipe, match } = this.props;
    const { params: { id } } = match;
    fetchRecipe(id);
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
                <Recomendations />
                <button
                  className="start-recipe-button"
                  type="button"
                  data-testid="start-recipe-btn"
                  onClick={ () => this.setRedirect() }
                >
                  Iniciar Receita
                </button>
                <button type="button" className="share-fill">
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
});

const mapDispatchToProps = (dispach) => ({
  fetchRecipe: (id) => dispach(fetchRecipes(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsFood);
