import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';

class RecomendationsDrinks extends Component {
  constructor(props) {
    super(props);

    this.filterSixDrinks = this.filterSixDrinks.bind(this);
  }

  filterSixDrinks() {
    const { drinks } = this.props;
    const SIX = 6;

    return drinks.filter((_element, index) => index < SIX);
  }

  render() {
    const drinks = this.filterSixDrinks();
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    return (
      <Slider { ...settings }>
        {
          drinks.map(({ strDrinkThumb, strDrink }, index) => (
            <div key={ index }>
              <h3
                data-testid={ `${index}-recomendation-title` }
              >
                { strDrink }
              </h3>
              <img
                data-testid={ `${index}-recomendation-card` }
                src={ strDrinkThumb }
                alt="foto"
                width="200 px"
              />
            </div>
          ))
        }
      </Slider>
    );
  }
}

const mapStateToProps = (state) => ({
  drinks: state.drinks.drinks,
});

export default connect(mapStateToProps)(RecomendationsDrinks);

RecomendationsDrinks.propTypes = {
  drinks: PropTypes.objectOf(PropTypes.object),
}.isRequired;
