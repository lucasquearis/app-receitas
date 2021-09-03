import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Modal from 'react-modal';
import UseModal from '../../hook/UseModal';
import ModalCopy from '../ModalCopy/ModalCopy';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareButtonIcon from '../../images/shareIcon.svg';
import { CardSection, CardImg, CardH2, P, Button, ButtonDiv } from './styles';

function FavoriteCard({ recipe, cardIndex, handleClick }) {
  const { name, area, category, type, id, image, alcoholicOrNot } = recipe;

  const { modalIsOpen,
    copyLinkFromDone,
    closeModal,
    customStyles } = UseModal();

  Modal.setAppElement('#root');

  return (
    <CardSection>
      <Link to={ `/${type}s/${id}` }>
        <CardImg
          src={ image }
          alt={ name }
          data-testid={ `${cardIndex}-horizontal-image` }
        />
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <CardH2 data-testid={ `${cardIndex}-horizontal-name` }>{name}</CardH2>
        <P data-testid={ `${cardIndex}-horizontal-top-text` }>
          {type === 'comida' ? `${area} - ${category}` : alcoholicOrNot}
        </P>
      </Link>
      <ButtonDiv>
        <Button
          type="button"
          data-testid={ `${cardIndex}-horizontal-share-btn` }
          onClick={ () => copyLinkFromDone(type, id) }
          src={ shareButtonIcon }
        >
          <img src={ shareButtonIcon } alt="share-button" />
        </Button>
        <Modal
          isOpen={ modalIsOpen }
          onRequestClose={ closeModal }
          style={ customStyles }
          contentLabel="Example Modal"
        >
          <ModalCopy />
        </Modal>
        <Button
          src={ blackHeartIcon }
          type="button"
          data-testid={ `${cardIndex}-horizontal-favorite-btn` }
          onClick={ () => handleClick(id) }
        >
          <img
            src={ blackHeartIcon }
            alt="favorite-button"
          />
        </Button>
      </ButtonDiv>
    </CardSection>
  );
}

FavoriteCard.propTypes = {
  recipe: propTypes.shape({
    id: propTypes.string,
    type: propTypes.string,
    area: propTypes.string,
    category: propTypes.string,
    alcoholicOrNot: propTypes.string,
    name: propTypes.string,
    image: propTypes.string,
  }).isRequired,
  cardIndex: propTypes.number.isRequired,
  handleClick: propTypes.func.isRequired,
};

export default FavoriteCard;
