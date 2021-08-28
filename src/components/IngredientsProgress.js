import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import myContext from '../context/myContext';
import '../styles/IngredientsProgress.css';

export default function IngredientsProgress() {
  const { lists, objRecipeProgress, setObjRecipeProgress } = useContext(myContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const text = pathname.includes('comidas') ? 'meals' : 'cocktails';

  useEffect(() => {
    const func = () => {
    };
    func();
  }, [objRecipeProgress]);

  const handleClassChange = ({ target: { name, checked } }) => {
    if (localStorage.inProgressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(objRecipeProgress));
      const value = { [text]: { [id]: { [name]: checked } } };
      console.log(objRecipeProgress[text][id]);
      setObjRecipeProgress({ ...objRecipeProgress,
        [text]: { [id]: { ...objRecipeProgress[text][id], [name]: checked } } });
    }
  };

  if (!lists) return '';
  return (
    <div className="ingredients-container">
      <h3 className="title-ingrendients">Ingredients</h3>
      <ul>
        {
          lists.ingredients.map((item, key) => (
            <li
              key={ key }
              data-testid={ `${key}-ingredient-step` }
            >
              <input
                type="checkbox"
                name={ key }
                onChange={ (e) => handleClassChange(e) }

              />

              { `${item} - ${lists.measure[key]}` }
            </li>
          ))
        }
      </ul>
    </div>
  );
}

// const toggleLineThrough = (value) => {
//   console.log(value);
//   if (value === 'none') setToggle('line-through');
//   if (value === 'line-through') setToggle('none');
// };

// const local = JSON.parse(localStorage.getItem('inProgressRecipe'));
// const result = (Object.keys(local[text]).includes(id));

// const obj = { cocktails: {},
// meals: { 52771: ['on', 'off', 'off', 'off', 'off', 'off', 'off', 'off'],
//   53060: ['on', 'off', 'off', 'off', 'off', 'off', 'off', 'off'] },
// };

// localStorage.setItem('inProgressRecipe', JSON.stringify(obj));
// const { classNameItem } = lists;
// const text = keyType === 'meals' ? 'meals' : 'cocktails';

// const handleClassChange = (value) => {
//   const result = classNameItem.filter((i, key) => key === value);
//   const flip = result[0] === 'off' ? 'on' : 'off';
//   classNameItem[value] = flip;
//   setLists({ ...lists, classNameItem });
// };

// setObjRecipeProgress({ ...objRecipeProgress, [keyType]: { [id]: [...onOff] } });

// useEffect(() => {
//   const func = () => {
//     console.log('aui', onOff);
//     setObjRecipeProgress({ ...objRecipeProgress, [text]: { [id]: [...onOff] } });
//     console.log(objRecipeProgress);
//     localStorage.setItem('inProgressRecipe', JSON.stringify(objRecipeProgress));
//   };
//   func();
// }, [onOff]);
// console.log(onOff);

// const handleClassChange = (value) => {
//   const result = onOff.filter((i, key) => key === value);
//   const flip = result[0] === 'off' ? 'on' : 'off';
//   onOff[value] = flip;
//   console.log(onOff);
//   setOnOff([...onOff]);
// };
