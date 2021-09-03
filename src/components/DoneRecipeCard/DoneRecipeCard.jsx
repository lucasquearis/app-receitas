import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Modal from 'react-modal';
import shareButtonIcon from '../../images/shareIcon.svg';
import UseModal from '../../hook/UseModal';
import ModalCopy from '../ModalCopy/ModalCopy';
import { DoneSectionCard, CardImg, CardH2, P, Date, Button,
  Span, BottomDiv } from './styles';

function DoneRecipeCard({ recipe, cardIndex }) {
  const { image, name, type, area, category,
    alcoholicOrNot, doneDate, tags, id } = recipe;
  const { modalIsOpen,
    copyLinkFromDone,
    closeModal,
    customStyles } = UseModal();

  Modal.setAppElement('#root');

  return (
    <DoneSectionCard>
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
        <Date data-testid={ `${cardIndex}-horizontal-done-date` }>
          {`Feita em: ${doneDate}`}
        </Date>
      </Link>
      <BottomDiv>
        <div>
          {tags.map((tag) => (
            <Span key={ tag } data-testid={ `${cardIndex}-${tag}-horizontal-tag` }>
              {tag}
            </Span>))}
        </div>
        <div>
          <Button
            type="button"
            data-testid={ `${cardIndex}-horizontal-share-btn` }
            src={ shareButtonIcon }
            onClick={ () => copyLinkFromDone(type, id) }
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
        </div>
      </BottomDiv>
    </DoneSectionCard>
  );
}

DoneRecipeCard.propTypes = {
  recipe: propTypes.shape({
    id: propTypes.string,
    type: propTypes.string,
    area: propTypes.string,
    category: propTypes.string,
    alcoholicOrNot: propTypes.string,
    name: propTypes.string,
    image: propTypes.string,
    doneDate: propTypes.string,
    tags: propTypes.arrayOf(propTypes.string),
  }).isRequired,
  cardIndex: propTypes.number.isRequired,
};

export default DoneRecipeCard;
