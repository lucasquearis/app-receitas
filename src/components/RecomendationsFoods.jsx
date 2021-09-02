import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';

class RecomendationsFoods extends Component {
  constructor(props) {
    super(props);

    this.filterSixFoods = this.filterSixFoods.bind(this);
  }

  filterSixFoods() {
    const { meals } = this.props;
    const SIX = 6;

    return meals.filter((_element, index) => index < SIX);
  }

  render() {
    const meals = this.filterSixFoods();
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
          meals.map(({ strMealThumb, strMeal }, index) => (
            <div key={ index }>
              <h3
                data-testid={ `${index}-recomendation-title` }
              >
                { strMeal }
              </h3>
              <img
                data-testid={ `${index}-recomendation-card` }
                src={ strMealThumb }
                alt="foto"
                width="300 px"
              />
            </div>
          ))
        }
      </Slider>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.foods.meals,
});

export default connect(mapStateToProps)(RecomendationsFoods);

RecomendationsFoods.propTypes = {
  meals: PropTypes.objectOf(PropTypes.object),
}.isRequired;
