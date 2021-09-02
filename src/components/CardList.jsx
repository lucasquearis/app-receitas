import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from './Card';

const MAXIMUM_INDEX = 11;

function CardList({ list, apiType, page, onClick }) {
  const changeRender = (item, index) => {
    if (apiType !== 'Ingredient') {
      return (
        <Link
          className="singleCard"
          to={ `/${page}/${item[`id${apiType}`]}` }
          key={ index }
        >
          <Card
            index={ index }
            thumb={ item[`str${apiType}Thumb`] }
            name={ item[`str${apiType}`] }
          />
        </Link>
      );
    }
    return (
      <div className="singleCard">
        <Card
          index={ index }
          thumb={ `https://www.themealdb.com/images/ingredients/${item[`str${apiType}`]}-Small.png` }
          name={ item[`str${apiType}`] }
          onClick={ onClick }
          apiType={ apiType }
        />
      </div>
    );
  };
  return (
    <main className="cardContainer">
      <div className="cardList">
        {
          !list ? <div>Empty List</div> : (
            list.map((item, index) => index > MAXIMUM_INDEX
            || (
              changeRender(item, index)
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
  onClick: PropTypes.func.isRequired,
};

CardList.defaultProps = {
  list: [{}],
};

export default CardList;
