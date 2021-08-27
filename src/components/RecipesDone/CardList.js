import React from 'react';
import Card from './Card';

function CardList({ filteredArray }) {
  return (
    filteredArray.map((item, i) => {
      if (item.type === 'comida') {
        return (<Card
          key={ i }
          id={ item.id }
          categoria={ item.category }
          name={ item.name }
          date={ item.doneDate }
          tags={ item.tags }
          imgSrc={ item.image }
          type={ item.type }
          index={ i }
          area={ item.area }
        />
        );
      }
      return (<Card
        key={ i }
        id={ item.id }
        categoria={ item.alcoholicOrNot }
        name={ item.name }
        date={ item.doneDate }
        tags={ item.tags }
        imgSrc={ item.image }
        type={ item.type }
        index={ i }
        area={ item.area }
      />
      );
    })
  );
}

export default CardList;
