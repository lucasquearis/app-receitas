import React from 'react';

function Categories() {
  // const [selected, setSelected] = useState('');
  // function select({ target: { innerText: value } }) {
  //   if (selected && selected === value) {
  //     setSelected('');
  //     return;
  //   }
  //   setSelected(value);
  // }

  return (
    <div>
      {/* {list.map(({ strCategory }, i) => (
        <button
          key={ i }
          type="button"
          onClick={ (e) => select(e) }
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}
        </button>
      ))} */}
    </div>
  );
}

export default Categories;
