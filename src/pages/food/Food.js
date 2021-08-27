import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardsList from '../../components/CardsList/CardsList';
import Header from '../../components/header/Header';
import FooterMenu from '../../components/FooterMenu/FooterMenu';

const Food = ({ storeItems }) => {
  if (storeItems.length > 0) {
    return (
      <div>
        <Header>Comidas</Header>
        <CardsList array={ storeItems } teste="recipe-card" />
      </div>
    );
  }
  return (
    <div>
      <Header>Comidas</Header>
      <FooterMenu />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    storeItems: state.items.items,
  };
}

Food.propTypes = {
  storeItems: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Food);
