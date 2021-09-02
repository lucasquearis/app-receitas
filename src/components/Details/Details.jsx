import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  DetailsWrapper,
  Image, Tittle,
  ShareButton, Favorite, Category,
  Ingrediente, Instructions, Video, Recomended, Start, Carousel, Title,
} from './styles';
import useDetails from '../../hooks/useDetails';
import useLocal from '../../hooks/useLocal';
import useCopy from '../../hooks/useCopy';

const six = 6;
const five = 5;

function DetailsComp({ type, routeParams }) {
  const { details, recomendations } = useDetails(type, routeParams[0]);
  const { copy, share } = useCopy();
  const { filteredFav, addToFav } = useLocal(type);
  const [recIndex, setRecIndex] = useState([0, 1]);

  const nextCard = () => {
    if (recIndex[1] === five) {
      setRecIndex([0, 1]);
      return;
    }
    setRecIndex([recIndex[0] + 1, recIndex[1] + 1]);
  };

  if (details && recomendations) {
    return (
      <DetailsWrapper>
        <Image
          data-testid="recipe-photo"
          src={ `${details[`str${details.prefix}Thumb`]}` }
        />
        <Tittle data-testid="recipe-title">{ details[`str${details.prefix}`] }</Tittle>
        <ShareButton onClick={ share } data-testid="share-btn">{copy}</ShareButton>
        <Favorite
          src={ filteredFav.some(
            (e) => e.id === details[`id${details.prefix}`],
          ) ? '/images/blackHeartIcon.svg' : '/images/whiteHeartIcon.svg' }
          onClick={ () => addToFav(details) }
          data-testid="favorite-btn"
        >
          Favoritar
        </Favorite>
        <Category data-testid="recipe-category">
          {details.prefix === 'Drink' ? details.strAlcoholic : details.strCategory}
        </Category>
        <div>
          {
            Object.entries(details)
              .filter((entries) => entries[0]
                .includes('strIngredient') && entries[1] !== null && entries[1] !== '')
              .map((e, index) => (
                <Ingrediente
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ e[1] }
                >
                  {`${e[1]}, ${details[`strMeasure${[index + 1]}`]}`}
                </Ingrediente>
              ))
          }
        </div>
        <Instructions
          data-testid="instructions"
        >
          {details.strInstructions}
        </Instructions>
        <Video data-testid="video" />
        <div>
          <Carousel>
            {
              recomendations.filter((e__, index) => index < six).map((e, index) => (
                <Recomended
                  index={ index }
                  recIndex={ recIndex }
                  key={ e[`str${type === 'bebidas' ? 'Meal' : 'Drink'}`] }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <Title data-testid={ `${index}-recomendation-title` }>
                    {e[`str${type === 'bebidas' ? 'Meal' : 'Drink'}`]}
                  </Title>
                </Recomended>
              ))
            }
          </Carousel>
          <button type="button" onClick={ () => nextCard() }>Next</button>
        </div>
        <Link to={ `/${type}/${routeParams[0]}/in-progress` }>
          <Start data-testid="start-recipe-btn">Iniciar Receita</Start>
        </Link>
      </DetailsWrapper>
    );
  }
  return (
    <h1>Loading</h1>
  );
}

DetailsComp.propTypes = {
  type: PropTypes.string.isRequired,
  routeParams: PropTypes.arrayOf(String).isRequired,
};

export default DetailsComp;
