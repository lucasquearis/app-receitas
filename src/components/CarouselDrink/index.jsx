import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { fetchFoodRedux } from '../../redux/actions/foodActions';

export default function CarouselFood() {
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchFoodRedux);
  }, [dispatch]);

  const sixRecomendations = 6;
  const carouselMeals = [...meals.slice(0, sixRecomendations)];

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
        { carouselMeals.map((food, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <Link to={ `/comidas/${food.idMeal}/` }>
              <img src={ food.strMealThumb } alt="meal-recomendation" />
              <p data-testid={ `${index}-recomendation-title` }>{ food.strMeal}</p>
            </Link>
          </div>)) }
      </Carousel>
    </ul>
  );
}
