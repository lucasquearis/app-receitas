import React from 'react';
import { Card } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import useRecomendations from '../hooks/useRecomendations';
import 'react-multi-carousel/lib/styles.css';

export default function DrinksRecomendations() {
  const { recomendations } = useRecomendations();

  const maxLength = 6;

  return (
    <Carousel
      additionalTransfrom={ 0 }
      arrows
      autoPlaySpeed={ 3000 }
      centerMode={ false }
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={ false }
      infinite={ false }
      itemClass=""
      keyBoardControl
      minimumTouchDrag={ 80 }
      renderButtonGroupOutside={ false }
      renderDotsOutside={ false }
      responsive={ {
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 3,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
      } }
      showDots={ false }
      sliderClass=""
      slidesToSlide={ 2 }
      swipeable
    >
      {recomendations.map(({
        idDrink,
        strDrinkThumb,
        strAlcoholic,
        strDrink,
      }, index) => {
        if (index < maxLength) {
          return (
            <Card.Body
              key={ idDrink }
              data-testid={ `${index}-recomendation-card` }
            >
              <Card.Img
                style={ { width: '200px' } }
                src={ strDrinkThumb }
                alt="Foto do drink"
              />
              <Card.Title>{strAlcoholic}</Card.Title>
              <Card.Title data-testid={ `${index}-recomendation-title` }>
                {strDrink}
              </Card.Title>
            </Card.Body>
          );
        }
        return null;
      })}
    </Carousel>
  );
}
