import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Instructions from '../../components/Instructions';
import RecomendationsDrinks from '../../components/RecomendationsDrinks';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import fetchCocktail from '../../Redux/actions/fetchCocktail';
import DrinkscheckIngredients from '../../components/DrinksCheckIngredients';

class DetailsDrink extends Component {
  componentDidMount() {
    const { getCocktail, match } = this.props;
    const { params: { id } } = match;
    getCocktail(id);
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
                    <img
                      className="img-details"
                      data-testid="recipe-photo"
                      src={ strDrinkThumb }
                      alt="foto"
                    />
                  </div>
                  <div>
                    <h1 data-testid="recipe-title">{ strDrink }</h1>
                    <h2 data-testid="recipe-category">
                      { strCategory }
                      { strAlcoholic }
                    </h2>
                    <button className="share-fill" type="button">
                      <img src={ ShareIcon } alt="share button" data-testid="share-btn" />
                    </button>
                    <button
                      className="share-fill"
                      type="button"
                    >
                      <img
                        src={ WhiteHeartIcon }
                        alt="favorite button"
                        data-testid="favorite-btn"
                      />
                    </button>
                  </div>
                  <DrinkscheckIngredients />
                  <Instructions />
                  <RecomendationsDrinks />
                  <buttons
                    className="btn btn-warning"
                    type="button"
                    data-testid="finish-recipe-btn"
                  >
                    Finalizar drink
                  </buttons>
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
  getCocktail: (id) => dispach(fetchCocktail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDrink);
