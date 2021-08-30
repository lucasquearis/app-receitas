import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Modal from 'react-modal';
import UseModal from '../../hook/UseModal';
import ModalCopy from '../ModalCopy/ModalCopy';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareButtonIcon from '../../images/shareIcon.svg';

function FavoriteCard({ recipe, cardIndex, handleClick }) {
  const { name, area, category, type, id, image, alcoholicOrNot } = recipe;

  const { modalIsOpen,
    copyLinkFromDone,
    closeModal,
    customStyles } = UseModal();

  Modal.setAppElement('#root');

  return (
    <section>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt={ name }
          width="150px"
          height="150px"
          data-testid={ `${cardIndex}-horizontal-image` }
        />
      </Link>
      <div>
        <p data-testid={ `${cardIndex}-horizontal-top-text` }>
          {type === 'comida' ? `${area} - ${category}` : alcoholicOrNot}
        </p>
        <Link to={ `/${type}s/${id}` }>
          <p data-testid={ `${cardIndex}-horizontal-name` }>{name}</p>
        </Link>
        <button
          type="button"
          data-testid={ `${cardIndex}-horizontal-share-btn` }
          onClick={ () => copyLinkFromDone(type, id) }
          src={ shareButtonIcon }
        >
          <img src={ shareButtonIcon } alt="share-button" />
        </button>
        <Modal
          isOpen={ modalIsOpen }
          onRequestClose={ closeModal }
          style={ customStyles }
          contentLabel="Example Modal"
        >
          <ModalCopy />
        </Modal>
        <button
          src={ blackHeartIcon }
          type="button"
          data-testid={ `${cardIndex}-horizontal-favorite-btn` }
          onClick={ () => handleClick(id) }
        >
          <img
            src={ blackHeartIcon }
            alt="favorite-button"
            width="20px"
            height="20px"
          />
        </button>
      </div>
    </section>
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
