import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardsList from '../../components/CardsList/CardsList';
import Header from '../../components/header/Header';
import FooterMenu from '../../components/FooterMenu/FooterMenu';

const Drinks = ({ storeItems }) => {
  if (storeItems.length > 0) {
    return (
      <div>
        <Header>Bebidas</Header>
        <CardsList array={ storeItems } />
      </div>
    );
  }
  return (
    <div>
      <Header>Bebidas</Header>
      <FooterMenu />
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
