import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

function DoneRecipesCard(props) {
  const [show, setShow] = React.useState(false);

  const {
    id,
    index,
    IDimg,
    thumbnail,
    thumbnailIcon,
    titleImg,
    IDtopText,
    titleTopText,
    IDnameRecipe,
    titleNameRecipe,
    IDdoneDate,
    titleDoneDate,
    IDshareBtn,
    titleShareBtn,
    IDtag,
  } = props;

  const handleShare = async () => {
    const time = 2000;
    const URL = `http://localhost:3000/comidas/${id}`;
    navigator.clipboard.writeText(URL);
    setShow(true);
    await setTimeout(() => setShow(false), time);
  };

  return (
    <div>
      <Link
        to={ `/comidas/${id}` }
      >
        <img
          src={ thumbnail }
          data-testid={ IDimg }
          alt={ titleImg }
        />
      </Link>
      <p
        data-testid={ IDtopText }
      >
        { titleTopText }
      </p>
      <Link to={ `/bebidas/${id}` }>
        <h2
          data-testid={ IDnameRecipe }
        >
          { titleNameRecipe }
        </h2>
      </Link>
      <p
        data-testid={ IDdoneDate }
      >
        { titleDoneDate }
      </p>
      {show ? <Alert>Link copiado!</Alert> : null}
      <button
        type="button"
        onClick={ handleShare }
      >
        <img
          src={ thumbnailIcon }
          data-testid={ IDshareBtn }
          alt={ titleShareBtn }
        />
      </button>
      { IDtag.map((tag) => (
        <span
          key={ index }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { tag }
        </span>
      ))}
    </div>
  );
}

const { string } = PropTypes;

DoneRecipesCard.propTypes = {
  index: string.isRequired,
  id: string.isRequired,
  IDimg: string.isRequired,
  IDtopText: string.isRequired,
  IDnameRecipe: string.isRequired,
  IDdoneDate: string.isRequired,
  IDshareBtn: string.isRequired,
  IDtag: string.isRequired,
  thumbnail: string.isRequired,
  thumbnailIcon: string.isRequired,
  titleImg: string.isRequired,
  titleTopText: string.isRequired,
  titleNameRecipe: string.isRequired,
  titleDoneDate: string.isRequired,
  titleShareBtn: string.isRequired,
};

export default DoneRecipesCard;
