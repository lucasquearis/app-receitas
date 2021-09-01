import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from './Card';

const MAXIMUM_INDEX = 11;

function CardList({ list, apiType, page }) {
  return (
    <main className="cardContainer">
      <div className="cardList">
        {
          !list ? <div>Empty List</div> : (
            list.map((item, index) => index > MAXIMUM_INDEX
            || (
              <Link
                to={ `/${page}/${item[`id${apiType}`]}` }
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
      </div>
    </main>
  );
}

CardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  apiType: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

CardList.defaultProps = {
  list: [{}],
};

export default CardList;
