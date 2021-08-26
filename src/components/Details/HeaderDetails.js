import React from 'react';
import { string } from 'prop-types';
import Button from '../Button';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function HeaderDetails(props) {
  const {
    title,
    photo,
    category,
  } = props;

  return (
    <div>
      <img src={ photo } alt="" data-testid="recipe-photo" />
      <div>
        <h2 data-testid="recipe-title">{ title }</h2>
        <h4 data-testid="recipe-category">{ category }</h4>
      </div>
      <div>
        <Button
          testId="share-btn"
          name={ <img src={ shareIcon } alt="share" /> }
        />
        <Button
          testId="favorite-btn"
          name={ <img src={ whiteHeartIcon } alt="favorite" /> }
        />
      </div>
    </div>
  );
}

HeaderDetails.propTypes = {
  title: string.isRequired,
  photo: string.isRequired,
  category: string.isRequired,
};
