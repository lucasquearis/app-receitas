import React from 'react';
import PropTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '../../Components/IconBtn';
import Vid from '../../Components/Vid';
import Btn from '../../Components/Btn';
// import List from '../../Components/List';

function RecipeDetails() {
  const titleProps = {
    'data-testid': 'recipe-title',
  };
  const imgProps = {
    src: 'image',
    'data-testid': 'recipe-photo',
  };
  const shareBtn = {
    name: 'share',
    'data-testid': 'share-btn',
    icon: ShareIcon,
    alt: 'shareIcon',
    type: 'button',
    variant: 'contained',
  };
  const favBtn = {
    name: 'favorite',
    'data-testid': 'explore-favorite-btn',
    icon: FavoriteIcon,
    alt: 'favoriteIcon',
    type: 'button',
    variant: 'contained',
  };
  const categoryProps = {
    'data-testid': 'recipe-category',
  };
  // const ListProps = {
  //   name: 'List',
  //   variant: 'contained',
  //   primary: 'ingredient',
  // };
  const InstructionProps = {
    'data-testid': 'instructions',
  };
  const vidProps = {
    'data-testid': 'video',
    src: 'Link do Video',
  };
  const btnProps = {
    name: 'Iniciar Receita',
    'data-testid': 'start-recipe-btn',
    type: 'button',
    variant: 'contained',
  };

  // props.match.params
  return (
    <>
      <h1 { ...titleProps }>Title</h1>
      <img alt="food" { ...imgProps } />
      <IconButton { ...shareBtn } />
      <IconButton { ...favBtn } />
      <h2 { ...categoryProps }>Category</h2>
      {/* meals.map((elm, ind) => <List {...ListProps,
        'data-testid': `${ind}-ingredient-name-and-measure'}` />) */}
      <p { ...InstructionProps }>Instruction Text</p>
      <Vid { ...vidProps } />
      {/* meals.map((elm) => elm) */}
      <Btn { ...btnProps } />
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipeDetails;
