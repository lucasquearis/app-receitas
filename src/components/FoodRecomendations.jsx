import React from 'react';
import { Card } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useRecomendations from '../hooks/useRecomendations';

export default function FoodRecomendations() {
  const { recomendations } = useRecomendations();

  const maxLength = 6;

  return (
    <Carousel
      additionalTransfrom={ 0 }
      arrows
      autoPlaySpeed={ 3000 }
      centerMode={ false }
      containerClass="pt-2"
      dotListClass=""
      draggable
      focusOnSelect={ false }
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={ 80 }
      partialVisible={ false }
      renderButtonGroupOutside={ false }
      renderDotsOutside={ false }
      responsive={ {
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 3,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 2,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
        },
      } }
      showDots={ false }
      sliderClass=""
      slidesToSlide={ 2 }
      swipeable
    >
      {recomendations.map(({
        idMeal,
        strMealThumb,
        strMeal,
        strCategory,
      }, index) => {
        if (index < maxLength) {
          return (
            <Card className="border" key={ index }>
              <Card.Img
                src={ strMealThumb }
                alt="Foto do drink"
              />
              <Card.Body
                className="bg-color p-2"
                key={ idMeal }
                data-testid={ `${index}-recomendation-card` }
              >
                <Card.Title
                  className="m-0"
                  data-testid={ `${index}-recomendation-title` }
                >
                  {strMeal}
                </Card.Title>
                <Card.Text>
                  {strCategory}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        }
        return null;
      })}
    </Carousel>
  );
}
