import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const MAXIMUM_INDEX = 11;

function CardList({ list, thumbValue, nameValue }) {
  return (
    <main>
      {
        !list ? <div>Empty List</div> : (
          list.map((item, index) => index > MAXIMUM_INDEX
          || (
            <Card
              key={ index }
              index={ index }
              thumb={ item[thumbValue] }
              name={ item[nameValue] }
            />
          ))
        )
      }
    </main>
  );
}

CardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  thumbValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
};

CardList.defaultProps = {
  list: [{}],
};

export default CardList;
