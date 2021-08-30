import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IngredientsDrink from '../../components/IngredientsDrink';
import Instructions from '../../components/Instructions';
import Recomendations from '../../components/Recomendations';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import fetchCocktail from '../../Redux/actions/fetchCocktail';

class DetailsDrink extends Component {
  componentDidMount() {
    const { setCocktail, match } = this.props;
    const { params: { id } } = match;
    setCocktail(id);
  }

  render() {
    const { cocktail } = this.props;
    return (
      <div>
        <div>
          {
            cocktail.map(
              ({ strDrink, strCategory, strDrinkThumb, strAlcoholic }, index) => (
                <div key={ index }>
                  <div>
                    <img data-testid="recipe-photo" src={ strDrinkThumb } alt="foto" />
                  </div>
                  <div>
                    <h1 data-testid="recipe-title">{ strDrink }</h1>
                    <h2 data-testid="recipe-category">
                      { strCategory }
                      { strAlcoholic }
                    </h2>
                  </div>
                  <IngredientsDrink />
                  <Instructions />
                  <Recomendations />
                  <button
                    type="button"
                    data-testid="start-recipe-btn"
                  >
                    Start recipe
                  </button>
                  <button type="button">
                    <img src={ ShareIcon } alt="share button" data-testid="share-btn" />
                  </button>
                  <button type="button">
                    <img
                      src={ WhiteHeartIcon }
                      alt="favorite button"
                      data-testid="favorite-btn"
                    />
                  </button>
                </div>
              ),
            )
          }
        </div>

      </div>
    );
  }
}

DetailsDrink.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  cocktail: state.drinks.cocktails,
});

const mapDispatchToProps = (dispach) => ({
  setCocktail: (id) => dispach(fetchCocktail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDrink);
