import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import myContext from '../context/myContext';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { clearSearch } from '../redux/actions/mainActions';

function Footer() {
  const dispatch = useDispatch();
  const { removeDisplayList } = useContext(myContext);

  const handleClick = () => {
    dispatch(clearSearch());
    removeDisplayList();
  };

  return (
    <div className="footer-wrapper">
      <footer data-testid="footer">
        <div className="icons">
          <Link to="/bebidas" data-testid="icone-bebida" onClick={ handleClick }>
            <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinks-bottom" />
          </Link>
          <Link to="/explorar" data-testid="icone-explorar" onClick={ handleClick }>
            <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore" />
          </Link>
          <Link to="/comidas" data-testid="icone-comida" onClick={ handleClick }>
            <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
