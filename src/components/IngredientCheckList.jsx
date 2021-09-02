import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './IngredientCheckList.css';

const IngredientListHandle = (array) => {
  const obj = array[0].map((n) => (
    n[1] !== '' && n[1] !== null
      ? n[1]
      : null
  ));
  return obj.filter((n) => (n !== null));
};

const UpdateStoraInProgressID = (ID) => {
  const storageGet = JSON.parse(localStorage.getItem('InProgressIds'));
  const id = ID;
  if (storageGet === null) {
    localStorage.setItem('InProgressIds', JSON.stringify([]));
    return UpdateStoraInProgressID(ID);
  }
  const getid = storageGet.map((n, index) => (n[0] === id ? index : null))
    .find((n) => n !== null);
  if (getid === undefined) {
    const addReciToInProg = Object.entries({ [id]: [false] });
    storageGet.push(addReciToInProg[0]);
    localStorage.setItem('InProgressIds', JSON.stringify(storageGet));
    return UpdateStoraInProgressID(ID);
  }
  return null;
};

const SetstoraInProgressID = (ID, indexes) => {
  const storageGet = JSON.parse(localStorage.getItem('InProgressIds'));
  const id = ID;
  const getid = storageGet.map((n, index) => (n[0] === id ? index : null))
    .find((n) => n !== null);
  console.log(getid);
  if (getid || getid === 0) {
    storageGet[getid][1][indexes] = !storageGet[getid][1][indexes];
    localStorage.setItem('InProgressIds', JSON.stringify(storageGet));
  }
};

/*
Essa função ClassHandle, foi resolvida o conteudo desse link, onde fazendo o spread do state,
o react visualiza que tem que ser re-renderizada a pagina
https://stackoverflow.com/questions/56266575/why-is-usestate-not-triggering-re-render
*/

const classHandler = (state, indexes, ID) => {
  const neww = [...state];
  neww[indexes] = !neww[indexes];
  SetstoraInProgressID(ID, indexes);
  return neww;
};

export default function IngredientCheckList(props) {
  const { array } = props;
  const { id } = useParams();
  const measures = IngredientListHandle(array.measures);
  const ingredients = IngredientListHandle(array.ingredients);
  UpdateStoraInProgressID(id);
  const preRender = JSON.parse(localStorage.getItem('InProgressIds'));
  const [CBox, setclass] = useState(ingredients.map(() => false));
  const [CBoxM, setMark] = useState(preRender);

  useEffect(() => {
    UpdateStoraInProgressID(id);
  }, [id]);

  useEffect(() => {
    const storaget = JSON.parse(localStorage.getItem('InProgressIds'));
    const getid = storaget.map((n, index) => (n[0] === id ? index : null))
      .find((n) => n !== null);
    setMark([...storaget[getid][1]]);
  }, [CBox, id]);

  return (
    <>
      {ingredients.map((n, index) => (
        <li Key={ index }>
          <label
            htmlFor={ `${index}-key` }
            className={ CBoxM[index] ? 'checked' : 'unchecked' }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              checked={ CBoxM[index] }
              type="checkbox"
              onChange={ () => setclass(classHandler(CBox, index, id)) }
            />
            {`${n} ${measures[index]}`}
          </label>
        </li>
      ))}
    </>
  );
}

const { string, shape } = PropTypes;
IngredientCheckList.propTypes = {
  array: shape({
    tittle: string.isRequired,
    img: string.isRequired,
    type: string,
    category: string.isRequired,
    Instructions: string.isRequired,
    tag: string.isRequired,
    ingredients: string.isRequired,
    measures: string.isRequired,
  }).isRequired,
};
