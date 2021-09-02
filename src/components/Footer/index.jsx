import React, { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContext';
import { FooterWrapper, Icon } from './styles';

function Footer() {
  const { history } = useContext(RecipesContext);
  return (
    <FooterWrapper data-testid="footer">
      <Icon
        src="/images/drinkIcon.svg"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/bebidas') }
      />
      <Icon
        src="/images/mealIcon.svg"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/comidas') }
      />
      <Icon
        src="/images/exploreIcon.svg"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explorar') }
      />
    </FooterWrapper>
  );
}

export default Footer;
