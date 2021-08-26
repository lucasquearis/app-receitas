import React from 'react';
import PropTypes from 'prop-types';
import Btn from '../Btn';

const BtnCategory = ({ category }) => {
  const maxCategory = 5;
  if (category === undefined) {
    return <div>loding</div>;
  }
  return (
    <div>
      {category.slice(0, maxCategory).map(({ strCategory }) => {
        const valueBtn = {
          name: `${strCategory}`,
          'data-testid': `${strCategory}-category-filter`,
          type: 'button',
        };
        return <Btn { ...valueBtn } Key={ strCategory } />;
      })}
    </div>
  );
};

BtnCategory.propTypes = {
  category: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default BtnCategory;
