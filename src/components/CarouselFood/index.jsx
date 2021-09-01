import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { fetchDrinksRedux } from '../../redux/actions/foodActions';

export default function CarouselFood() {
  const dispatch = useDispatch();
  const { drinks } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchDrinksRedux);
  }, [dispatch]);

  const sixRecomendations = 6;
  const carouselDrinks = [...drinks.slice(0, sixRecomendations)];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };

  return (
    <ul>
      <Carousel
        swipeable={ false }
        draggable={ false }
        showDots
        responsive={ responsive }
        autoPlaySpeed={ 1000 }
        keyBoardControl
        customTransition="all .5"
        transitionDuration={ 500 }
        containerClass="carousel-container"
        removeArrowOnDeviceType={ ['tablet', 'mobile'] }
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        { carouselDrinks.map((drink, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <Link to={ `/bebidas/${drink.idDrink}/` }>
              <img src={ drink.strDrinkThumb } alt="drink-recomendation" />
              <p data-testid={ `${index}-recomendation-title` }>{ drink.strDrink}</p>
            </Link>
          </div>))}
      </Carousel>
    </ul>
  );
}
