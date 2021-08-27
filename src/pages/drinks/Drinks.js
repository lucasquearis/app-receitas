import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardsList from '../../components/CardsList/CardsList';
import Header from '../../components/header/Header';

const Drinks = ({ storeItems }) => {
  if (storeItems.length > 0) {
    return (
      <div>
        <Header>Bebidas</Header>
        <CardsList array={ storeItems } teste="recipe-card" />
      </div>
    );
  }
  return (
    <div>
      <Header>Bebidas</Header>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    storeItems: state.items.items,
  };
}

Drinks.propTypes = {
  storeItems: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Drinks);
