import React from 'react';
import propTypes from 'prop-types';
import Modal from 'react-modal';
import shareIconImg from '../../images/shareIcon.svg';
import UseFavorite from '../../hook/UseFavorite';
import ModalCopy from '../ModalCopy/ModalCopy';
import UseModal from '../../hook/UseModal';

function HeroDetails({ recipe, type }) {
  const { changeFavorite, heart } = UseFavorite(recipe);
  const { modalIsOpen,
    copyLink,
    closeModal,
    customStyles } = UseModal();

  Modal.setAppElement('#root');

  return (
    <section>
      <img
        src={ recipe[`str${type}Thumb`] }
        alt="recipe"
        data-testid="recipe-photo"
        width="100px"
        height="100px"
      />
      <h2 data-testid="recipe-title">{recipe[`str${type}`]}</h2>
      <button
        src={ shareIconImg }
        type="button"
        data-testid="share-btn"
        onClick={ () => copyLink() }
      >
        <img src={ shareIconImg } alt="share-button" width="20px" height="20px" />
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
        src={ heart }
        type="button"
        data-testid="favorite-btn"
        onClick={ () => changeFavorite() }
      >
        <img src={ heart } alt="favorite-button" width="20px" height="20px" />
      </button>
      <h3 data-testid="recipe-category">
        {recipe.strCategory}
        {'  '}
        {recipe.strAlcoholic}
      </h3>
    </section>
  );
}

HeroDetails.propTypes = {
  recipe: propTypes.shape({
    strCategory: propTypes.string,
    strAlcoholic: propTypes.string,
  }).isRequired,
  type: propTypes.string.isRequired,
};

export default HeroDetails;
