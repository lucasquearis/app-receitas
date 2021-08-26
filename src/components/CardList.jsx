import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from './Card';

const MAXIMUM_INDEX = 11;

function CardList({ list, apiType }) {
  return (
    <main>
      {
        !list ? <div>Empty List</div> : (
          list.map((item, index) => index > MAXIMUM_INDEX
          || (
            <Link
              to={ `/comidas/${item[`id${apiType}`]}` }
              key={ index }
            >
              <Card
                index={ index }
                thumb={ item[`str${apiType}Thumb`] }
                name={ item[`str${apiType}`] }
              />
            </Link>
          ))
        )
      }
    </main>
  );
}

CardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  apiType: PropTypes.string.isRequired,
};

CardList.defaultProps = {
  list: [{}],
};

export default CardList;
