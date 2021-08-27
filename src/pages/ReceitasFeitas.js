import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function ReceitasFeitas(props) {
  // const [doneRecipes, setDoneRecipes] = useState([]);
  const [copied, setCopied] = useState(false);
  const { history: { location: { pathname } } } = props;

  const shareHandleClick = () => {
    setCopied(true);
    copy(`http://localhost:3000${pathname}`);
  };

  return (
    <>
      <Image
        data-testid="share-btn"
        src={ shareIcon }
        alt="share icon"
        onClick={ () => shareHandleClick() }
      />
      {copied && <span>Link copiado!</span>}

      <Header titulo="Receitas Feitas" />
    </>
  );
}

export default ReceitasFeitas;
