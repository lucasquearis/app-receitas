import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import IngredientsDrink from '../../components/IngredientsDrink';
import Instructions from '../../components/Instructions';
import RecomendationsFoods from '../../components/RecomendationsFoods';
import ShareButton from '../../components/shareButton';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import fetchCocktail from '../../Redux/actions/fetchCocktail';
import fetchMeals from '../../Redux/actions/fetchMeals';
import './style.css';

class DetailsDrink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      red: false,
    };
    this.setRedirect = this.setRedirect.bind(this);
  }

  componentDidMount() {
    const { setCocktail, match, setMeals } = this.props;
    const { params: { id } } = match;
    setCocktail(id);
    setMeals();
  }

  setRedirect() {
    const { red } = this.state;
    this.setState({
      red: !red,
    });
  }

  render() {
    const { cocktail, match } = this.props;
    const { params: { id } } = match;
    const { red } = this.state;
    return (
      <div>
        <div>
          {
            cocktail.map(
              ({ strDrink, strCategory, strDrinkThumb, strAlcoholic }, index) => (
                <div key={ index }>
                  <div>
                    <img
                      data-testid="recipe-photo"
                      src={ strDrinkThumb }
                      alt="foto"
                      width="600 px"
                    />
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
                  <RecomendationsFoods />
                  <button
                    className="start-recipe-button"
                    type="button"
                    data-testid="start-recipe-btn"
                    onClick={ () => this.setRedirect() }
                  >
                    Iniciar Receita
                  </button>
                  <ShareButton />
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
          {
            red ? <Redirect to={ `/bebidas/${id}/in-progress` } /> : console.log('chamou')
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
  meals: state.foods.meals,
});

const mapDispatchToProps = (dispach) => ({
  setCocktail: (id) => dispach(fetchCocktail(id)),
  setMeals: () => dispach(fetchMeals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDrink);
