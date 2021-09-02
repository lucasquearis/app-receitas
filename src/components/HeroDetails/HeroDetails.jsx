import React from 'react';
import propTypes from 'prop-types';
import Modal from 'react-modal';
import shareIconImg from '../../images/shareIcon.svg';
import UseFavorite from '../../hook/UseFavorite';
import ModalCopy from '../ModalCopy/ModalCopy';
import UseModal from '../../hook/UseModal';
import { DetailImg, DetailBar, DetailName, DetailCategory,
  DetailBarIcon, LeftHeroDiv, BtnDiv } from './styles';

function HeroDetails({ recipe, type }) {
  const { changeFavorite, heart } = UseFavorite(recipe);
  const { modalIsOpen,
    copyLink,
    closeModal,
    customStyles } = UseModal();

  Modal.setAppElement('#root');

  return (
    <section>
      <DetailImg
        src={ recipe[`str${type}Thumb`] }
        alt="recipe"
        data-testid="recipe-photo"
        width="100px"
        height="100px"
      />
      <DetailBar>
        <LeftHeroDiv>
          <DetailName data-testid="recipe-title">{recipe[`str${type}`]}</DetailName>
          <DetailCategory data-testid="recipe-category">
            {recipe.strCategory}
            {'  '}
            {recipe.strAlcoholic}
          </DetailCategory>
        </LeftHeroDiv>
        <BtnDiv>
          <button
            src={ shareIconImg }
            type="button"
            data-testid="share-btn"
            onClick={ () => copyLink() }
          >
            <DetailBarIcon
              src={ shareIconImg }
              alt="share-button"
              width="20px"
              height="20px"
            />
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
            <DetailBarIcon
              src={ heart }
              alt="favorite-button"
              width="20px"
              height="20px"
            />
          </button>
        </BtnDiv>
      </DetailBar>
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
